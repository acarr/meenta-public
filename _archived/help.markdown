---
layout: default
title: Frequently Asked Questions
summary: This week Meenta went live.
tag: help questions
published: false
---

<p>

	Got questions about how Meenta works. This is a good starting point. We
	have collected the most common questions we have received.
</p>

<a href="" style="color: #5D5D5D; text-decoration: none; float: right;" class="showAll">Show All</a>

<ul class="faqs">
{% for faq in site.faqs %}
<li>
	<span class="question" style="padding-bottom: 10px; margin-bottom: 10px !important;">{{ faq.title }}</span>
	<div class="answer" style="display: none !important;">
		{{ faq.content }}
	</div>
</li>
{% endfor %}
</ul>

<a href="" style="color: #5D5D5D; text-decoration: none; float: right;" class="showAll">Show All</a>
