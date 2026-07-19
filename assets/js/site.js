(() => {
  const header = document.querySelector('[data-site-header]');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
    nav.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    });
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((item) => revealObserver.observe(item));
  }

  const homeSections = document.querySelectorAll('.home-page main section[id]');
  const sectionLinks = document.querySelectorAll('.site-nav [data-section]');
  if (homeSections.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      sectionLinks.forEach((link) => {
        link.toggleAttribute('aria-current', link.dataset.section === visible.target.id);
      });
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.25, 0.5] });
    homeSections.forEach((section) => sectionObserver.observe(section));
  }

  const adaptiveVideo = document.querySelector('[data-adaptive-video]');
  const videoDialog = document.querySelector('[data-video-dialog]');
  if (adaptiveVideo && videoDialog) {
    const stage = adaptiveVideo.closest('[data-video-stage]');
    const bufferUI = stage?.querySelector('[data-video-buffer]');
    const progress = stage?.querySelector('[data-video-progress]');
    const label = stage?.querySelector('[data-video-progress-label]');
    const qualityLabel = videoDialog.querySelector('[data-video-quality-label]');
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const preferLowData = Boolean(connection?.saveData || ['slow-2g', '2g', '3g'].includes(connection?.effectiveType));
    let objectURL = '';
    let loading = false;

    const ready = (src) => {
      if (objectURL) URL.revokeObjectURL(objectURL);
      objectURL = src.startsWith('blob:') ? src : '';
      adaptiveVideo.src = src;
      adaptiveVideo.load();
      adaptiveVideo.removeAttribute('aria-busy');
      bufferUI?.classList.add('is-ready');
      loading = false;
    };

    const loadVideo = async (lowData = preferLowData) => {
      if (loading) return;
      loading = true;
      adaptiveVideo.setAttribute('aria-busy', 'true');
      bufferUI?.classList.remove('is-ready');
      if (progress) progress.value = 0;
      const source = lowData ? adaptiveVideo.dataset.lowSrc : adaptiveVideo.dataset.standardSrc;
      if (qualityLabel) qualityLabel.textContent = lowData ? 'Low-data version · 480p' : 'Standard version · 720p';
      if (label) label.textContent = '0% loaded';
      try {
        const response = await fetch(source, { cache: 'force-cache' });
        if (!response.ok) throw new Error('Video request failed');
        const total = Number(response.headers.get('content-length')) || 0;
        if (!response.body?.getReader) {
          ready(URL.createObjectURL(await response.blob()));
          return;
        }
        const reader = response.body.getReader();
        const chunks = [];
        let received = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          received += value.length;
          if (total && progress && label) {
            const percent = Math.round((received / total) * 100);
            progress.value = percent;
            label.textContent = `${percent}% loaded for smooth playback`;
          }
        }
        ready(URL.createObjectURL(new Blob(chunks, { type: 'video/mp4' })));
      } catch (_) {
        if (label) label.textContent = 'Streaming version ready';
        ready(source);
      }
    };

    const closeVideo = () => {
      adaptiveVideo.pause();
      videoDialog.hidden = true;
      document.body.classList.remove('video-open');
      document.querySelector('[data-video-open]')?.focus();
    };

    document.querySelector('[data-video-open]')?.addEventListener('click', () => {
      videoDialog.hidden = false;
      document.body.classList.add('video-open');
      videoDialog.querySelector('[data-video-close]')?.focus();
      if (!adaptiveVideo.src) loadVideo();
    });
    videoDialog.querySelector('[data-video-close]')?.addEventListener('click', closeVideo);
    videoDialog.addEventListener('click', (event) => { if (event.target === videoDialog) closeVideo(); });
    videoDialog.querySelector('[data-video-low]')?.addEventListener('click', () => loadVideo(true));
    videoDialog.querySelector('[data-video-speed]')?.addEventListener('change', (event) => {
      adaptiveVideo.playbackRate = Number(event.target.value);
    });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !videoDialog.hidden) closeVideo(); });
  }

  const outputButtons = [...document.querySelectorAll('[data-output]')];
  const dimensionButtons = [...document.querySelectorAll('[data-dimension]')];
  const selectionLink = document.querySelector('[data-selection-link]');
  const selectionLinkLabel = document.querySelector('[data-selection-link-label]');
  const clearSelection = document.querySelector('[data-clear-selection]');

  if (selectionLink && selectionLinkLabel) {
    const selectedOutputs = new Set(outputButtons.filter((button) => button.getAttribute('aria-pressed') === 'true').map((button) => button.dataset.output));
    const selectedColumns = new Set();
    const selectedRows = new Set();
    const labels = Object.fromEntries(
      [...outputButtons, ...dimensionButtons].map((button) => [button.dataset.output || button.dataset.value, button.dataset.filterLabel])
    );

    const setPressed = (element, pressed) => {
      element.setAttribute('aria-pressed', String(pressed));
    };

    const updateSelection = () => {
      const params = new URLSearchParams();
      const selectedMethods = [...selectedOutputs].filter((item) => ['theory', 'behavior'].includes(item));
      const selectedApplications = [...selectedOutputs].filter((item) => !['theory', 'behavior'].includes(item));
      if (selectedMethods.length) params.set('methods', selectedMethods.join(','));
      if (selectedColumns.size) params.set('computations', [...selectedColumns].join(','));
      if (selectedRows.size) params.set('challenges', [...selectedRows].join(','));
      if (selectedApplications.length) params.set('applications', selectedApplications.join(','));
      selectionLink.href = `${selectionLink.dataset.baseHref}${params.size ? `?${params}` : ''}`;
      const segment = (values, fallback) => values.length ? values.map((item) => labels[item] || item).join(' × ') : fallback;
      selectionLinkLabel.textContent = [
        segment(selectedMethods, 'All research methods'),
        segment([...selectedColumns], 'All computations'),
        segment([...selectedRows], 'All challenges'),
        segment(selectedApplications, 'All applications')
      ].join(' × ').replace(/^/, 'View ');
      if (clearSelection) clearSelection.hidden = !(selectedOutputs.size || selectedColumns.size || selectedRows.size);
    };

    outputButtons.forEach((button) => button.addEventListener('click', () => {
      const output = button.dataset.output;
      if (selectedOutputs.has(output)) selectedOutputs.delete(output); else selectedOutputs.add(output);
      setPressed(button, selectedOutputs.has(output));
      updateSelection();
    }));
    dimensionButtons.forEach((button) => button.addEventListener('click', () => {
      const selected = button.dataset.dimension === 'column' ? selectedColumns : selectedRows;
      const value = button.dataset.value;
      if (selected.has(value)) selected.delete(value); else selected.add(value);
      setPressed(button, selected.has(value));
      updateSelection();
    }));
    clearSelection?.addEventListener('click', () => {
      selectedOutputs.clear();
      selectedColumns.clear();
      selectedRows.clear();
      [...outputButtons, ...dimensionButtons].forEach((button) => setPressed(button, false));
      updateSelection();
    });
    updateSelection();
  }

  const projectData = document.querySelector('#rcp-project-data');
  if (projectData) {
    const projects = JSON.parse(projectData.textContent || '[]').sort((a, b) => (b.year || 0) - (a.year || 0));
    const params = new URLSearchParams(window.location.search);
    const computations = new Set((params.get('computations') || '').split(',').filter(Boolean));
    const challenges = new Set((params.get('challenges') || '').split(',').filter(Boolean));
    const legacyOutputs = new Set((params.get('outputs') || '').split(',').filter(Boolean));
    const methods = new Set((params.get('methods') || '').split(',').filter(Boolean));
    const applications = new Set((params.get('applications') || '').split(',').filter(Boolean));
    legacyOutputs.forEach((item) => (['theory', 'behavior'].includes(item) ? methods : applications).add(item));
    const selectedTags = [...methods, ...computations, ...challenges, ...applications];
    const matches = projects.filter((project) => {
      return selectedTags.every((tag) => project.tags.includes(tag));
    });
    const results = document.querySelector('[data-selection-projects]');
    const empty = document.querySelector('[data-selection-empty]');
    const description = document.querySelector('[data-selection-description]');
    const baseurl = projectData.dataset.baseurl || '';
    const labels = {
      theory: 'Theory', behavior: 'Behavioral experiments',
      perception: 'Perception', planning: 'Planning', learning: 'Learning',
      pomdp: 'POMDP', context: 'Contextual inference', resource: 'Resource rationality',
      neural: 'Neural predictions', clinical: 'Clinical populations', machine: 'Machine learning applications'
    };
    const allWork = !selectedTags.length;
    if (allWork) document.querySelector('[data-selection-title]').textContent = 'All research';

    const filters = [...methods, ...computations, ...challenges, ...applications];
    description.textContent = allWork
      ? 'Chronological research collection'
      : `Intersection of ${filters.map((item) => labels[item] || item).join(' × ')}`;
    if (!matches.length) {
      empty.hidden = false;
    } else {
      matches.forEach((project) => {
        const card = document.createElement('article');
        card.className = 'selection-project';
        const eyebrow = document.createElement('p');
        eyebrow.className = 'eyebrow';
        eyebrow.textContent = [project.paper_type || 'Research article', project.year].filter(Boolean).join(' · ');
        const title = document.createElement('h2');
        title.textContent = project.title;
        const authors = document.createElement('p');
        authors.className = 'selection-authors';
        authors.textContent = project.authors;
        const summary = document.createElement('p');
        summary.textContent = project.summary;
        const tags = document.createElement('div');
        tags.className = 'selection-tags';
        project.tags.forEach((tag) => {
          const span = document.createElement('span');
          span.textContent = labels[tag] || tag;
          tags.append(span);
        });
        const meta = document.createElement('div');
        meta.className = 'selection-meta';
        if (project.link) {
          const link = document.createElement('a');
          link.textContent = project.link_label || 'Read the paper ↗';
          link.href = project.link.startsWith('/') ? `${baseurl}${project.link}` : project.link;
          if (!project.link.startsWith('/')) {
            link.target = '_blank';
            link.rel = 'noopener';
          }
          meta.append(link);
        }
        card.append(eyebrow, title, authors, summary, tags, meta);
        results.append(card);
      });
    }
  }

  document.querySelectorAll('[data-people-roster]').forEach((roster) => {
    const toggles = [...roster.querySelectorAll('[data-person-toggle]')];
    toggles.forEach((toggle) => toggle.addEventListener('click', () => {
      const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggles.forEach((item) => {
        item.setAttribute('aria-expanded', 'false');
        const panel = document.getElementById(item.getAttribute('aria-controls'));
        if (panel) panel.hidden = true;
      });
      if (!wasOpen) {
        const index = toggles.indexOf(toggle);
        const columns = getComputedStyle(roster).gridTemplateColumns.split(' ').filter(Boolean).length || 1;
        const rowEnd = Math.min((Math.floor(index / columns) + 1) * columns - 1, toggles.length - 1);
        toggle.setAttribute('aria-expanded', 'true');
        const panel = document.getElementById(toggle.getAttribute('aria-controls'));
        if (panel) {
          toggles[rowEnd].after(panel);
          panel.hidden = false;
        }
      }
    }));
  });

})();
