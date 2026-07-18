---
layout: default
title: People
description: Members of RCP Lab.
permalink: /people/
---

# People

{% assign people_profiles = site.people_profiles | sort: 'order' %}
<div class="people-roster people-roster-page" data-people-roster>
{% for person in people_profiles %}
  {% assign person_id = person.name | slugify %}
  <button type="button" class="person-tile" data-person-toggle aria-expanded="false" aria-controls="person-panel-page-{{ person_id }}">
    <img src="{{ person.image | relative_url }}" alt="">
    <div><h3>{{ person.name }}</h3><p>{{ person.role }}</p></div>
  </button>
{% endfor %}
{% for person in people_profiles %}
  {% assign person_id = person.name | slugify %}
  <div class="person-panel" id="person-panel-page-{{ person_id }}" data-person-panel hidden>
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

## Joining the lab

Interested in joining us? See the <a href="{{ '/open-positions/' | relative_url }}">Open Positions</a> page.
