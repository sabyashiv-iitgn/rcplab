# RCP Lab intro — voiceover script

Total runtime: **3:01**. This script is your own narration, cleaned up — the on-screen captions now follow the same wording and pacing, so you can read at a natural pace. Note: **planning now comes before learning**, matching how you narrated it. Press Space to play/pause, ←/→ to jump between scenes while recording.

| Time | Scene | Voiceover |
|------|-------|-----------|
| 0:00–0:12 | Title | How do minds act in an uncertain, changing world — with limited time and energy? At the RCP Lab, that is the question we are interested in studying. Let me motivate this with an example. |
| 0:12–0:23 | The airport | Imagine that you're in an airport you've never been in before, and you need to reach gate B7 to board your flight. |
| 0:23–0:39 | Perception | First, perception. You form a belief about where you are in this airport — by reading the airport signs, and looking at where the crowd is going. This computation — perception — forms beliefs about the world from impoverished observations. |
| 0:39–0:56 | Planning | Then, planning. Once you have an estimate of where you are, you consider several different routes to the gate: the lift, the escalator, or the stairs. Planning chooses the sequence of actions with the best expected outcome — here, reaching the gate as fast as possible. |
| 0:56–1:15 | Learning | And learning. Imagine one of these routes leads you to a dead end. This wrong turn isn't wasted — it updates the map inside your head. Learning is the process by which experience and feedback adjust our internal models — so that the next time we're in this airport, we already know the way. |
| 1:15–1:36 | One POMDP | So how do these work together? Perception infers beliefs about the state of the world from noisy observations… planning chooses actions based on these beliefs… and learning updates the model from the feedback we get after acting. The mathematics of their combination is described by a POMDP — a Partially Observable Markov Decision Process. |
| 1:36–1:50 | Contextual inference | But our everyday behavior involves many tasks — and each task has its own POMDP. Contextual inference involves finding out which task context we are in, and using the appropriate POMDP. |
| 1:50–2:19 | Resource rationality | But this is often not enough. Contextual inference and POMDPs give optimal solutions — but optimal solutions are expensive to compute, in both time and energy. Imagine you only have four minutes to find your gate: you don't solve the task exactly — you choose the best solution you can within that time. That's like approximating a circle with a simpler shape — a triangle. With a bit more time, say to get through security, you can afford a finer shape — a pentagon. And with a lot of time at the food court, an even finer shape. And it's not just the POMDP computations that are approximated — contextual inference is approximated too, shown here by the circle becoming a hexagon. This process — approximating complex computations under resource constraints, to choose actions that are just good enough — is resource rationality. |
| 2:19–2:34 | RCP Lab | And our logo encapsulates this research program. The Resource-rational Context-dependent POMDP Lab — the RCP Lab — studies how our minds perceive, plan, and learn in an uncertain, changing world, with limited time and energy. |
| 2:34–3:03 | Join us | In our lab, we build theoretical models within the RCP framework, and test those models through behavioral experiments. These models let us make neural predictions — that is, how neurons in the brain implement these computations. These models can also quantitatively explain behavioral differences in clinical populations. And we can use these models to build more robust, adaptive machine-learning algorithms that solve the same tasks as us. Interested in working on any of these? Scan the QR code to join or connect with the RCP Lab. |

## Recording tips

- Open `rcp-lab-intro.html` in Chrome, full-screen it, and screen-record while reading — the captions now match this script line by line, so they work as a teleprompter.
- Each caption change is your cue for the next sentence; the animations land on the key nouns (routes appear as you name them, shapes morph as you describe them).
- If you overrun a scene, pause (Space), finish the line, then resume — or jump back with ←.
- Color code: perception = blue, planning = green, learning = red, POMDP = dark shape, contextual inference = purple, resource rationality = brown.
