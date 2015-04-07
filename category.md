---
layout: page
permalink: /category/
---

<h1>Articles for <span class='category' id='category'></span></h1>
<ul class="post-list">
  {% for post in site.posts %}
    <li class='post hidden {{ post.category }}'>
      {% include postListItem.html %}
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

var category = getParameterByName("category");

$('.'+category).removeClass('hidden');
$('#category').text(category);
</script>
