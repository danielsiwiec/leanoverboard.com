---
title: 'Implementing tags in Jekyll'
tags:
  - jekyll
  - javascript
---

When you're considering [Jekyll](http://jekyllrb.com/) as your blogging platform,
you'll soon discover it's **tags** support is not complete.

### Problem statement

Tag feature basically consists of three abilities: a) adding tags to posts,
b) displaying all tags, with posts count and c) browsing posts by tag.

As Jekyll has a built-in support for adding metadata to posts, with tags being part of it,
the first two requirements are met by rendering the metadata. The last feature however, requires
the content to be dynamically generated (e.g. displaying all tags).

Typically, the server stores posts in a database, along with the tags. Upon request,
a page with a list of post for a certain tag can be generated, either on the server
(e.g. JSP) or client-side, with MVC frameworks, like Angular.JS or Ember.JS.

Jekyll, on the other hand. is a static page generator, which means the content is pre-generated
and the pages are server 'as-is'. A dynamic page, like a list of post for a tag, can't be
thus generated on demand. In this post, I'll show one way of making up for this shortcoming.

### Displaying tags on a post

<p>First off, let's knock the easy part out: displaying post's tags, with desired
outcome looking like this: {% include tags.html %}</p>

As mentioned previously, Jekyll stores tags in post's metadata, so displaying it
is as easy as accessing it:

{% highlight liquid %}
{% raw %}

{% if page.tags.size > 0 %}

  {% for tagName in page.tags %}
    {% capture tags_content %}{{ tags_content }}
    <a href='/tags?tagName={{ tagName }}'><i class='glyphicon glyphicon-tag'></i>{{ tagName }}</a>
    {% endcapture %}
  {% endfor %}
{% else %}
  {% assign tags_content = '' %}
{% endif %}

{{ tags_content }}

{% endraw %}
{% endhighlight %}


### Listing all tags

Secondly, we want to be able to list all available tags, somewhere on the index page, to
achieve a result like [here](/)

Jekyll offers global array `site.tags` which contains information on all the tags. Each
element is an array as follows: [0] - tag name and [1] - all posts for the tag.

Knowing this, creating a list of tags requires just proper formatting:

{% highlight liquid %}
{% raw %}

{% for tag in site.tags %}
  {% assign tagName = tag | first | downcase %}
  {% assign postsCount = tag | last | size %}
  <li><a href='/tags?tagName={{ tagName }}'><i class='glyphicon glyphicon-tag'></i>{{ tagName }}</a>({{ postsCount }})</li>
{% endfor %}

{% endraw %}
{% endhighlight %}


### Browsing posts by tag

Now, for the dynamic content. The trick presented below uses client-side filtering. The code uses jQuery for DOM manipulation, so you need to add this to the `_includes/head.html`:

{% highlight html %}
<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
{% endhighlight %}

A page containing all the posts is returned and filtered on the client side using
JavaScript, basing on URL parameter.

{% highlight html %}
{% raw %}
---
layout: page
permalink: /tags/
---

<h1>Articles for <i class='glyphicon glyphicon-tag'></i> <span id='tagName'></span></h1>
<ul class="post-list">
  {% for post in site.posts %}
    <li class='post hidden {{ post.tags | join: " " }}'>
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

var tagName = getParameterByName("tagName");

$('.'+tagName).removeClass('hidden');
$('#tagName').text(tagName);
</script>

{% endraw %}
{% endhighlight %}

That's all! There are other ways of adding tag support to Jekyll. A different approach
generating all tag pages up-front, upon deployment is described [here](http://charliepark.org/tags-in-jekyll/)

Happy blogging!
