import fs from "node:fs/promises";
import path from "node:path";
import net from "node:net";
import crypto from "node:crypto";

async function connectWebSocket(address) {
  const url = new URL(address);
  const socket = net.createConnection({host: url.hostname, port: Number(url.port)});
  const key = crypto.randomBytes(16).toString("base64");
  let buffer = Buffer.alloc(0), handshaken = false, fragment = Buffer.alloc(0), onMessage = () => {};
  const ready = new Promise((resolve, reject) => {
    socket.once("error", reject);
    socket.once("connect", () => socket.write(
      `GET ${url.pathname}${url.search} HTTP/1.1\r\n` +
      `Host: ${url.host}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n` +
      `Sec-WebSocket-Key: ${key}\r\nSec-WebSocket-Version: 13\r\n\r\n`
    ));
    socket.on("data", chunk => {
      buffer = Buffer.concat([buffer, chunk]);
      if (!handshaken) {
        const end = buffer.indexOf("\r\n\r\n");
        if (end < 0) return;
        const header = buffer.subarray(0, end).toString("utf8");
        if (!header.startsWith("HTTP/1.1 101")) return reject(new Error(`WebSocket upgrade failed: ${header}`));
        buffer = buffer.subarray(end + 4); handshaken = true; resolve();
      }
      while (buffer.length >= 2) {
        const first = buffer[0], second = buffer[1], opcode = first & 0x0f, final = Boolean(first & 0x80);
        let length = second & 0x7f, offset = 2;
        if (length === 126) {
          if (buffer.length < 4) return;
          length = buffer.readUInt16BE(2); offset = 4;
        } else if (length === 127) {
          if (buffer.length < 10) return;
          length = Number(buffer.readBigUInt64BE(2)); offset = 10;
        }
        if (buffer.length < offset + length) return;
        const payload = buffer.subarray(offset, offset + length);
        buffer = buffer.subarray(offset + length);
        if (opcode === 8) return socket.end();
        if (opcode === 9) { sendFrame(payload, 10); continue; }
        if (opcode === 1 || opcode === 0) fragment = Buffer.concat([fragment, payload]);
        if (final && (opcode === 1 || opcode === 0)) { onMessage(fragment.toString("utf8")); fragment = Buffer.alloc(0); }
      }
    });
  });
  function sendFrame(payload, opcode = 1) {
    payload = Buffer.isBuffer(payload) ? payload : Buffer.from(payload);
    const mask = crypto.randomBytes(4);
    let header;
    if (payload.length < 126) {
      header = Buffer.from([0x80 | opcode, 0x80 | payload.length]);
    } else if (payload.length < 65536) {
      header = Buffer.alloc(4); header[0] = 0x80 | opcode; header[1] = 0xfe; header.writeUInt16BE(payload.length, 2);
    } else {
      header = Buffer.alloc(10); header[0] = 0x80 | opcode; header[1] = 0xff; header.writeBigUInt64BE(BigInt(payload.length), 2);
    }
    const masked = Buffer.alloc(payload.length);
    for (let i = 0; i < payload.length; i++) masked[i] = payload[i] ^ mask[i % 4];
    socket.write(Buffer.concat([header, mask, masked]));
  }
  await ready;
  return {send: value => sendFrame(value), close: () => socket.end(), setOnMessage: fn => {onMessage = fn;}};
}

const port = Number(process.argv[2] || 9223);
const outputDir = process.argv[3];
const fps = Number(process.argv[4] || 15);
const duration = Number(process.argv[5] || 185.514);
if (!outputDir) throw new Error("Usage: node render_voiceover_movie.mjs PORT OUTPUT_DIR [FPS] [DURATION]");

await fs.mkdir(outputDir, {recursive: true});

let targets;
for (let tries = 0; tries < 80; tries++) {
  try {
    targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    if (targets.length) break;
  } catch {}
  await new Promise(resolve => setTimeout(resolve, 100));
}
if (!targets?.length) throw new Error("Chrome debugging endpoint did not become ready");

const pageTarget = targets.find(target => target.type === "page");
const socket = await connectWebSocket(pageTarget.webSocketDebuggerUrl);

let nextId = 0;
const pending = new Map();
const events = new Map();
socket.setOnMessage(data => {
  const message = JSON.parse(data);
  if (message.id) {
    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    if (message.error) waiter.reject(new Error(message.error.message));
    else waiter.resolve(message.result);
  } else {
    const waiters = events.get(message.method);
    if (waiters?.length) waiters.shift()(message.params);
  }
});
function command(method, params = {}) {
  const id = ++nextId;
  socket.send(JSON.stringify({id, method, params}));
  return new Promise((resolve, reject) => pending.set(id, {resolve, reject}));
}
function once(method) {
  return new Promise(resolve => {
    if (!events.has(method)) events.set(method, []);
    events.get(method).push(resolve);
  });
}

await command("Page.enable");
await command("Runtime.enable");
await command("Emulation.setDeviceMetricsOverride", {
  width: 1280, height: 720, deviceScaleFactor: 1, mobile: false
});
const loaded = once("Page.loadEventFired");
await command("Page.navigate", {
  url: "http://127.0.0.1:8765/lab-intro/rcp-lab-intro-voiceover.html?export=1&t=0"
});
await loaded;
await command("Runtime.evaluate", {
  expression: "document.fonts.ready", awaitPromise: true, returnByValue: true
});

const frames = Math.ceil(duration * fps);
for (let frame = 0; frame < frames; frame++) {
  const time = frame / fps;
  const existing = path.join(outputDir, `frame-${String(frame).padStart(5, "0")}.jpg`);
  try { const st = await fs.stat(existing); if (st.size > 1000) continue; } catch {}
  const rendered = await command("Runtime.evaluate", {
    expression: `window.renderAt(${time})`, returnByValue: true
  });
  if (rendered.exceptionDetails) throw new Error(`Frame ${frame} failed to render`);
  const shot = await command("Page.captureScreenshot", {
    format: "jpeg", quality: 90, fromSurface: true,
    clip: {x: 0, y: 0, width: 1280, height: 720, scale: 1}
  });
  const filename = path.join(outputDir, `frame-${String(frame).padStart(5, "0")}.jpg`);
  await fs.writeFile(filename, Buffer.from(shot.data, "base64"));
  if (frame % (fps * 10) === 0) console.log(`Rendered ${Math.round(time)} / ${Math.round(duration)} seconds`);
}

socket.close();
console.log(`Rendered ${frames} frames at ${fps} fps`);
