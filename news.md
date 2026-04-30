---
layout: default
title: News
description: Updates from RCP Lab.
permalink: /news/
---

# News

{% for post in site.posts %}
<article class="news-item">
  <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
  <p class="metadata">{{ post.date | date: "%B %-d, %Y" }}</p>
  {{ post.excerpt }}
</article>
{% endfor %}

{% if site.posts.size == 0 %}
No news posts yet.
{% endif %}
