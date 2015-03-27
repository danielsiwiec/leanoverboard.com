---
layout: page
title: Tags
permalink: /tags/
---

<h1>Articles by tag: <span id='tagName'></span></h1>
<ul class="post-list">
  {% for post in site.posts %}
    <li class='post hidden {{ post.tags | join: " " }}'>
      <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>

      <h2>
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      </h2>
    </li>
  {% endfor %}
</ul>

<script>
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var tagName = getParameterByName("tagName");

$('.'+tagName).removeClass('hidden');
$('#tagName').text(tagName);
</script>
