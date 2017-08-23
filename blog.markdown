---
layout: default
title: The Meenta Blog & Roadmap
summary:
tag: blog ngs startup roadmap
---

<ul class="posts">
	{% for post in site.posts %}
	<li>
		<a href="{{ post.url }}" style="font-size: 18px; font-weight: bold; color: #5D5D5D; text-decoration: none">
			{{ post.title }}
		</a>
		<p>{{ post.summary }}</p>
	</li>
	{% endfor %}
</ul>
