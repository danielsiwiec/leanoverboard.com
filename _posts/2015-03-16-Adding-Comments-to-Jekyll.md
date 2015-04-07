---
title: 'Adding comments capability to your Jekyll blog with Disqus'
category: programming
tags:
  - jekyll
  - blog
  - disqus
---

Adding comments to your Jekyll blog is very easy with Disqus support. There are 3 simple
steps:

1. Register your page on [Disqus](https://disqus.com/admin/create/)
2. Copy the [universal code](https://blogtestrelease.disqus.com/admin/universalcode/) and paste it in **_layouts/posts.html** in between
{% raw %}```{% if page.comments %}```{% endraw %}
and {% raw %}```{% endif %}```{% endraw %} tags, where you want the comments to show
3. *Optional* Create a default property in **_config.yml**:
{% highlight text %}
defaults:
  -
    scope:
      path: ""
      type: "posts"
    values:
      comments: true
{% endhighlight %}

This will enable comments on your posts by default. If you wish to disable comments for a particular post
just add ```comments: false``` in the [Front Matter](http://jekyllrb.com/docs/frontmatter/)


Done.
