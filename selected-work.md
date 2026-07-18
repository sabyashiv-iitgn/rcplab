---
layout: default
title: Selected RCP Work
description: Research selected from the RCP framework.
permalink: /selected-work/
body_class: selection-page
---

<section class="selection-results" data-selection-results>
  <p class="eyebrow">Your RCP selection</p>
  <h1 data-selection-title>Selected research</h1>
  <p class="selection-description" data-selection-description></p>
  <p class="authorship-legend"><span><strong>*</strong> Equal contribution</span><span><strong>†</strong> Shared senior contribution</span></p>
  <div class="selection-projects" data-selection-projects></div>
  <div class="selection-empty" data-selection-empty hidden>
    <p class="eyebrow">Still working on it</p>
    <h2>This combination is part of where RCP Lab is heading.</h2>
    <p>Interested in developing it with us? We would be glad to hear from you.</p>
    <a class="button button-primary" href="{{ '/#connect' | relative_url }}">Connect with RCP Lab <span aria-hidden="true">↗</span></a>
  </div>
  <p><a class="button button-outline" href="{{ '/#framework' | relative_url }}">Change selection</a></p>
</section>

<script id="rcp-project-data" type="application/json" data-baseurl="{{ site.baseurl }}">{{ site.data.projects | jsonify }}</script>
