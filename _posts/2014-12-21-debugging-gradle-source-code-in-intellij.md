---
title: 'Debugging Gradle source code in IntelliJ'
tags:
  - gradle
  - intellij
  - debugging
---

If you find yourself needing to debug Gradle source code, here's a few simple steps you need to follow. There are some great posts online that explain how to attach a remote debugger, like [this one](http://blog.gaku.net/gradle-debugging/).

In this post I show an alternative solution which runs Gradle inside the IDE.

* Clone Gradle repository:
{% highlight bash %}
git clone git@github.com:gradle/gradle.git
{% endhighlight %}

* Checkout a specific release:
{% highlight bash %}
git tag -l
git checkout tags/REL_2.2.1
{% endhighlight %}

* Generate IntelliJ files:
{% highlight bash %}
cd gradle
./gradlew idea
{% endhighlight %}

* Import Gradle project into IntelliJ:

<a href='/assets/images/debug-gradle/import.png'><img src='/assets/images/debug-gradle/import.png' height='200' width='320' /></a>

* Edit **Gradle** Run Configuration to point to the project you want to run gradle on:

<a href='/assets/images/debug-gradle/config.png'><img src='/assets/images/debug-gradle/config.png' height='200' width='320' /></a>

The **-b** option allows you to pass a path to the build.gradle

* Set your breakpoints

* Hit Debug and wait for your breakpoint:

<a href='/assets/images/debug-gradle/debug.png'><img src='/assets/images/debug-gradle/debug.png' height='200' width='320' /></a>
