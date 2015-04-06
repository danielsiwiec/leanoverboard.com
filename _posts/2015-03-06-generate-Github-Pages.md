---
title: 'gh-deploy: One-liner GitHub page spin-up'
tags:
  - github
  - npm
  - node
  - coffeescript
---

Sometimes, you just need to host a simple, static HTML page on the web. GitHub makes
it much easier, with the introduction of the [GitHub Pages](https://pages.github.com/) service. There's still a couple steps required to get started with GitHub pages.
Introducing **gh-deploy**. This module leverages this service and automates the whole setup.


## Prerequisites

* github account
* npm

## How To

# Steps

* Install the gh-deploy module
{% highlight bash %}
npm install -g gh-deploy
{% endhighlight %}
* Run it

![Run it](/assets/images/gh-deploy/runit.png)

* Follow the wizard steps

![Wizard](/assets/images/gh-deploy/wizard.png)

* Wait for the page to be created

![Finish](/assets/images/gh-deploy/finish.png)

# Results

* The page deployed and accessible

![Hello world](/assets/images/gh-deploy/hello.png)

* GitHub repo created with a stub index file:

![Wizard](/assets/images/gh-deploy/github.png)

## Demos

Checkout the demos on YouTube:

Part I - Hello World (19 seconds)</a> (a little outdated - there are no input arguments anymore - the wizard asks about them)

<iframe width="420" height="315" src="https://www.youtube.com/embed/vJlg-0y2fTY" frameborder="0" allowfullscreen></iframe>

Part II - Deploy Todo MVC (36 seconds)

<iframe width="420" height="315" src="https://www.youtube.com/embed/5stwAqtgWTg" frameborder="0" allowfullscreen></iframe>


## Resources

[gh-deploy on GitHub](https://github.com/danielsiwiec/gh-deploy)


[gh-deploy on npmjs](https://www.npmjs.com/package/gh-deploy)
