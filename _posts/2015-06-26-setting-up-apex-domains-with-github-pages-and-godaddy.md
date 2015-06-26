---
title: 'Apex domains with GitHub pages and GoDaddy'
category: programming
tags:
  - github
  - godaddy
---

In this tutorial, we'll cover how to link a github page to a GoDaddy domain.

TL;DR

- Create github repo with your static page in gh-pages branch
- Add 192.30.252.153 and 192.30.252.154 A records in GoDaddy
- Add CNAME record with <github_username>.github.io for host **www**
- Add CNAME file with your domain name in github repo

## GitHub side

Let's start with creating a GitHub static page. You can easily do it with a tool like
[gh-deploy](http://localhost:4000/programming/2015/03/06/generate-Github-Pages.html)
or go through the steps manually. For the manual description, please refer to [Creating Project Pages manually](https://help.github.com/articles/creating-project-pages-manually/).
You can also do it using [GitHub's page generator](https://help.github.com/articles/creating-pages-with-the-automatic-generator/), which sets up your page with Jekyll.


## GoDaddy side

The configuration for proper domain resolution, consists of the following steps:

### Manage domain

Once logged into GoDaddy, go to your domain 'Manage domain' control panel. Here you need to configure two things. The first thing is adding the A record, which basically points a domain to an IP address. Here's what it should look like once you're done:

![A record](/assets/images/apex/arecord.png)

In case the GitHub's IP addresses change, check [here](https://help.github.com/articles/tips-for-configuring-an-a-record-with-your-dns-provider/) for reference.

The next thing is to add the CNAME record which ties the domain to your github account:
![CNAME](/assets/images/apex/cname.png)


Last thing to do, is to add a CNAME file in the root of your GitHub repo, that tells GitHub that THIS repo should be served, if the URL requested is **http://xyz.com**
{% highlight bash %}
echo "leanoverboard.com" > CNAME
git add . && git commit -m "Add CNAME file" && git push
{% endhighlight %}
