---
title: cucumber.options with gradle
category: programming
tags:
  - cucmber
  - maven
  - gradle
---

So, to make Gradle work like the maven:

{% highlight bash %}mvn test -Dcucumber.options="..."{% endhighlight %}

you have to do some extra magic. When Gradle forks a new process dedicated for tests it doesn't automatically forward the original system properties. In order to achieve this, the following needs to be added:

{% highlight groovy %}
test {systemProperties = System.properties}
{% endhighlight %}

Now you can use just do:

{% highlight bash %}
gradle -Dcucumber.options="..." test
{% endhighlight %}

and the options will be applied properly.

If you have multiple test tasks, you can also do it in one stab:

{% highlight groovy %}
tasks.withType(Test) {systemProperties = System.properties}
{% endhighlight %}

For a full working example check out my [fork](https://github.com/danielsiwiec/cucumber-java-skeleton) of cucumber-java-skeleton, adding gradle support.
