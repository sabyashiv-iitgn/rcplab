---
layout: default
title: Home
description: RCP Lab studies how minds perceive, learn, and plan in uncertain, changing worlds with limited resources.
body_class: home-page
---

<section class="home-hero" id="home" aria-labelledby="hero-title">
  <div class="home-hero-inner">
    <div class="hero-identity">
      <img class="hero-mark" src="{{ site.logo_mark | relative_url }}" alt="RCP Lab mark">
      <div class="hero-wordmark">
        <strong>RCP Lab</strong>
        <a class="hero-department" href="https://cogs.iitgn.ac.in/newcogs/">Department of Cognitive &amp; Brain Sciences</a>
        <span>IIT Gandhinagar</span>
      </div>
    </div>
    <h1 id="hero-title">How do minds act in an uncertain, changing world?</h1>
    <p class="hero-answer">By inferring <span class="word-context">context</span> and adapting <span class="word-perception">perception</span>, <span class="word-planning">planning</span>, and <span class="word-learning">learning</span> within <span class="word-resources">finite computational resources</span>.</p>
    <div class="hero-actions">
      <a class="button button-primary" href="#welcome">Discover RCP <span aria-hidden="true">↓</span></a>
      <a class="text-link" href="#connect">Connect with the lab <span aria-hidden="true">↗</span></a>
    </div>
  </div>
  <p class="scroll-cue" aria-hidden="true"><span></span> Scroll to explore</p>
</section>

<section class="welcome-section section-pad" id="welcome" aria-labelledby="welcome-title">
  <div class="section-heading section-heading-light reveal">
    <p class="eyebrow">Welcome to RCP Lab</p>
    <h2 id="welcome-title">Discover RCP with an example.</h2>
    <p>A short journey to a gate reveals perception, planning, learning, context, and resource rationality working together.</p>
  </div>
  <div class="film-shell reveal">
    <div class="video-poster" data-video-launcher>
      <img src="{{ '/lab-intro/rcp-lab-intro-poster.jpg' | relative_url }}" alt="Still from the RCP Lab welcome film">
      <button type="button" class="video-play" data-video-open><span aria-hidden="true">▶</span><strong>Play Intro to RCP film</strong><small>No video data loads until you click</small></button>
    </div>
    <div class="film-meta">
      <p><strong>What is RCP?</strong><span>3 minutes · Voice-over and captions</span></p>
    </div>
  </div>
</section>

<div class="video-dialog" data-video-dialog role="dialog" aria-modal="true" aria-label="RCP Lab welcome film" hidden>
  <button type="button" class="video-close" data-video-close aria-label="Close welcome film">×</button>
  <div class="video-dialog-inner">
    <div class="video-stage" data-video-stage>
      <video controls playsinline preload="none" poster="{{ '/lab-intro/rcp-lab-intro-poster.jpg' | relative_url }}" aria-label="Welcome to RCP Lab" data-adaptive-video data-standard-src="{{ '/lab-intro/rcp-lab-intro-web.mp4' | relative_url }}" data-low-src="{{ '/lab-intro/rcp-lab-intro-low.mp4' | relative_url }}"></video>
      <div class="video-buffer" data-video-buffer role="status"><span>Preparing smooth playback</span><progress max="100" value="0" data-video-progress></progress><small data-video-progress-label>Choosing the best version for this connection…</small></div>
    </div>
    <div class="video-quality">
      <span data-video-quality-label></span>
      <label>Playback speed
        <select data-video-speed aria-label="Playback speed">
          <option value="0.75">0.75×</option>
          <option value="1" selected>1×</option>
          <option value="1.25">1.25×</option>
          <option value="1.5">1.5×</option>
          <option value="2">2×</option>
        </select>
      </label>
      <button type="button" data-video-low>Use low-data version</button>
    </div>
  </div>
</div>

<section class="thesis-section section-pad" id="framework" aria-labelledby="framework-title">
  <div class="section-heading section-heading-light reveal">
    <p class="eyebrow">The RCP framework</p>
    <h2 id="framework-title">One framework. Many research subspaces.</h2>
    <p class="framework-provenance">RCP Lab is a newly established research group. Until the lab’s own projects mature, the work showcased here primarily reflects the PI’s previous research. These projects illustrate the range of questions, methods, and computational approaches that shape the lab’s current research directions.</p>
    <p>Select one or more areas to explore research at their intersection or <a href="{{ '/selected-work/' | relative_url }}">view work chronologically</a>.</p>
  </div>

  <div class="framework-selector reveal">
    <div class="selection-action selection-action-top selection-action-centered">
      <a class="button button-primary" data-selection-link data-base-href="{{ '/selected-work/' | relative_url }}" href="{{ '/selected-work/' | relative_url }}"><span data-selection-link-label>View All research methods × All computations × All challenges × All applications</span> <span aria-hidden="true">→</span></a>
      <button type="button" class="clear-selection" data-clear-selection hidden>Unselect all</button>
    </div>

    <div class="subspace-row" aria-label="Research method filters">
      <strong class="subspace-row-label">Research methods</strong>
      <div class="subspace-options subspace-options-two">
        <button type="button" data-output="theory" data-filter-label="Theory" aria-pressed="false">Theory</button>
        <button type="button" data-output="behavior" data-filter-label="Behavioral experiments" aria-pressed="false">Behavioral experiments</button>
      </div>
    </div>

    <div class="subspace-row" aria-label="Computation filters">
      <div class="subspace-row-heading">
        <strong>Computation</strong>
        <small>Problem</small>
        <small>Proposed solution</small>
      </div>
      <div class="subspace-options subspace-options-three">
        {% for column in site.data.research_matrix.columns %}
          <button type="button" class="subspace-pair pair-{{ column.class }}" data-dimension="column" data-value="{{ column.class }}" data-filter-label="{{ column.solution }}" aria-pressed="false">
            <small>{{ column.challenge }}</small><strong>→ {{ column.solution }}</strong>
          </button>
        {% endfor %}
      </div>
    </div>

    <div class="subspace-row" aria-label="Challenge filters">
      <div class="subspace-row-heading">
        <strong>Challenges</strong>
        <small>Problem</small>
        <small>Proposed solution</small>
      </div>
      <div class="subspace-options subspace-options-three">
        {% for row in site.data.research_matrix.rows %}
          <button type="button" class="subspace-pair pair-{{ row.class }}" data-dimension="row" data-value="{{ row.class }}" data-filter-label="{{ row.principle }}" aria-pressed="false">
            <small>{{ row.challenge }}</small><strong>→ {{ row.principle }}</strong>
          </button>
        {% endfor %}
      </div>
    </div>

    <div class="subspace-row" id="applications" aria-label="Application filters">
      <strong class="subspace-row-label">Applications</strong>
      <div class="subspace-options subspace-options-three">
        {% for application in site.data.applications %}
          <button type="button" data-output="{{ application.class }}" data-filter-label="{{ application.title }}" aria-pressed="false">{{ application.title }}</button>
        {% endfor %}
      </div>
    </div>
  </div>
</section>

<section class="people-section section-pad" id="people" aria-labelledby="people-title">
  <div class="section-heading reveal">
    <p class="eyebrow">The lab</p>
    <h2 id="people-title">Think deeply. Build carefully. Learn broadly.</h2>
  </div>
  {% assign people_profiles = site.people_profiles | sort: 'order' %}
  <div class="people-roster" data-people-roster>
    {% for person in people_profiles %}
      {% assign person_id = person.name | slugify %}
      <button type="button" class="person-tile reveal" data-person-toggle aria-expanded="false" aria-controls="person-panel-{{ person_id }}">
        <img src="{{ person.image | relative_url }}" alt="">
        <div><h3>{{ person.name }}</h3><p>{{ person.role }}</p></div>
      </button>
    {% endfor %}
    {% for person in people_profiles %}
      {% assign person_id = person.name | slugify %}
      <div class="person-panel" id="person-panel-{{ person_id }}" data-person-panel hidden>
        <img src="{{ person.image | relative_url }}" alt="{{ person.name }}">
        <div class="person-panel-copy">
          <h3>{{ person.name }}</h3>
          <p class="person-panel-role">{{ person.role }}</p>
          <div class="person-about"><h4>About</h4>{{ person.content | markdownify }}</div>
          <a href="mailto:{{ person.contact_email }}">{{ person.contact_email }}</a>
        </div>
      </div>
    {% endfor %}
  </div>
</section>

<section class="connect-section section-pad" id="connect" aria-labelledby="connect-title">
  <div class="section-heading section-heading-light reveal">
    <p class="eyebrow">Join / Connect</p>
    <h2 id="connect-title">There are many ways to engage with the RCP Lab.</h2>
    <p>Work with us, take part in a study, collaborate on research, or invite us to speak.</p>
    <p class="connect-direct">You are always welcome to email <a href="mailto:sabyashiv@iitgn.ac.in">sabyashiv@iitgn.ac.in</a>. Using the relevant form below is encouraged and will usually help us respond more promptly.</p>
  </div>
  <div class="connect-grid">
    {% for item in site.data.connect %}
      <article class="connect-card reveal">
        <span>0{{ forloop.index }}</span>
        <h3>{{ item.title }}</h3>
        <p>{{ item.summary }}</p>
        <a href="{% if item.url contains '://' or item.url contains 'mailto:' %}{{ item.url }}{% else %}{{ item.url | relative_url }}{% endif %}"{% if item.url contains '://' %} target="_blank" rel="noopener"{% endif %}>{{ item.action }} <span aria-hidden="true">↗</span></a>
      </article>
    {% endfor %}
  </div>
</section>

<section class="explore-section section-pad" id="lab-life" aria-labelledby="explore-title">
  <div class="section-heading reveal">
    <p class="eyebrow">Inside RCP Lab</p>
    <h2 id="explore-title">Lab life</h2>
  </div>
  <div class="explore-grid">
    <a href="{{ '/resources/' | relative_url }}"><span>Resources</span><i>↗</i></a>
    <a href="{{ '/lab-gallery/' | relative_url }}"><span>Lab gallery</span><i>↗</i></a>
    <a href="{{ '/lab-culture/' | relative_url }}"><span>Lab culture</span><i>↗</i></a>
  </div>
</section>
