---
title: 'AWS Ruby SDK custom waiters'
tags:
  - aws
  - amazon
  - ruby
---

Waiters is a mechanism of the SDK that allows you to halt code execution until a certain condition is met. Until version **2.0.35** of the SDK, the waiters were implemented as a set of methods on resource (more on resources [here](/2015/03/12/AWS-Ruby-SDK-Client-vs-Resource.html)) classes, with baked in conditions to wait on. In this post, I'll explain how I helped improve the SDK with custom waiters.

### Waiters

The original waiters API provides methods waiting for a particular condition, for example waiting for an EC2 instance to be running:

{% highlight ruby %}
instance = instance.wait_until_running
puts instance.state_name # => running
{% endhighlight %}

Every ```Resource``` has got a couple of wait methods, like [```Instance#wait_until_terminated```](http://docs.aws.amazon.com/sdkforruby/api/Aws/EC2/Instance.html#wait_until_terminated-instance_method) or [```Bucket#wait_until_exists```](http://docs.aws.amazon.com/sdkforruby/api/Aws/S3/Bucket.html#wait_until_exists-instance_method). Under the hood, the method polls the AWS API and checks if the condition is met. Every method has got a pre-programmed delay between polls and a maximum number of attempts.

The downside of this approach is the lack of ability to wait on an arbitrary condition and there's only a couple of wait methods per resource. The limitation may seem far fetched, but I happened to run into it myself, while working on one of my pet projects.

### Use Case

I needed to programmatically spin off EC2 instances on demand and execute Ansible playbooks against them. I noticed that sometimes it takes a while for AWS to assign a DNS name, even if the instance reports as running and without it, I can't run Ansible. Of course I could have waited for a long enough time for the DNS name to be assigned or rolled my own waiting-polling mechanism, but this is no way to write software. The functionality I really needed, would wait until the DNS was assigned. More generally, I wanted to **wait for an arbitrary condition**.

The use cases are almost endless. Maybe you want to wait for the S3 Object to change the owner, or an EC2 Image to be updated. Introducing custom waiters.

### Custom Waiters

With the introduction of custom waiters, you can pass any block and the execution will be halted until the condition is met (or the timeout is reached). Every time the API is polled, the new ```Resource``` is yielded to the block.

{% highlight ruby %}
instance = instance.wait_until {|instance| !instance.public_dns_name.empty? }
puts instance.public_dns_name # => ec2-54-133-81-263.us-west-1.compute.amazonaws.com
{% endhighlight %}

The default wait between polls (10 seconds) and maximum number of attempts (10) can be overriden:

{% highlight ruby %}
instance.wait_until(delay:5,max_attempts:30) {...}
{% endhighlight %}
