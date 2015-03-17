---
title: 'AWS Ruby SDK v2: Client vs Resource'
tags:
  - aws
  - amazon
  - ruby
---

Late last year, Amazon [announced](http://ruby.awsblog.com/post/Tx2NJE86FP0HHXX/Announcing-V2-of-the-AWS-SDK-for-Ruby) v2 of AWS Ruby SDK.

Among other features, Amazon added **Resource** and **Client** classes for each of their services.
While being functionally equivalent, they present different paradigms.

The **Client** class serves as a proxy to the API calls, with 1-to-1 method mapping and the more interesting **Resource** class offers an object-oriented interface.

In this demo, we will solve a simple problem of:

* **listing** all EC2 instances along with some useful information
* **rebooting** all of them

We will accomplish this using the **Client** and **Resource** classes separately, to show the difference in approach.

## Prerequisites

* ruby
* aws-sdk gem
* AWS account


## Credentials

Create a **creds.json** file, that looks like this:

{% highlight json %}
{
  "AccessKeyId":"AKIAJU37JJMCPAIWJTJT",
  "SecretAccessKey":"klMYNV8wfg/Jq68Rts12QsLvTjRs3+4edBzlhPOm"
}
{% endhighlight %}

The keys are account specific. You can get yours on the AWS portal in the **Security Credentials** tab.

Here's the code to create the ```Credentials``` object. We will use it in a bit.

{% highlight ruby%}
require 'aws-sdk'
require 'json'

creds = JSON.load(File.read('creds.json'))
creds = Aws::Credentials.new(creds['AccessKeyId'], creds['SecretAccessKey'])
{% endhighlight %}



## Client approach

We start with creating the ```Client``` instance. Notice the use of previously created ```creds``` object.

{% highlight ruby %}
ec2 = Aws::EC2::Client.new(region:'us-west-1',credentials:creds)
{% endhighlight %}

Next, we list and reboot the instances:

{% highlight ruby %}
instance_ids = []
ec2.describe_instances['reservations'].each do |reservation|
  reservation['instances'].each do |instance|
    puts "ID: #{instance.instance_id} State: #{instance.state.name} Hostname: #{instance.public_dns_name}"
    instance_ids.push instance.instance_id
  end
end

ec2.reboot_instances(instance_ids: instance_ids)
{% endhighlight %}


Output:
{% highlight bash%}
dsiwiec@NAdsiwiec aws]$ ruby list.rb
ID: i-703f74b8 State: running Hostname: ec2-56-67-20-185.us-west-1.compute.amazonaws.com
ID: i-1c1279d4 State: running Hostname: ec2-56-153-62-149.us-west-1.compute.amazonaws.com
{% endhighlight %}

## Resource approach

First, we create the ```Resource``` instance, in a similar fashion.
{% highlight ruby%}
ec2 = Aws::EC2::Resource.new(region:'us-west-1',credentials:creds)
{% endhighlight %}

To list all instances, we use the ```instances``` method, which returns a Collection of
[Instance](http://docs.aws.amazon.com/sdkforruby/api/Aws/EC2/Instance.html) objects.
Notice the difference from the Client approach here.

{% highlight ruby%}
ec2.instances.each do |instance|
  puts "ID: #{instance.instance_id} State: #{instance.state.name} Hostname: #{instance.public_dns_name}"
  instance.reboot
end
{% endhighlight %}

Once we have a collections of instances, we just iterate over them and output the properties.
As we iterate over ```Instances```, we can also invoke the ```reboot``` method directly on the elements.


## Summary

The ```Client``` offers a more procedural approach, which is more intuitive for people accustomed
to the AWS Command Line Interface. It's undeniable advantage is the ability to perform bulk operations
on many instances, which might be a factor when dealing with high number of instances.

The ```Resource``` on the other hand, with it's object oriented
angle, is easier for manipulation and results in higher code readability.

### Resources
* [AWS SDK for Ruby v2 Reference](http://docs.aws.amazon.com/sdkforruby/api/_index.html)
* [Complete code for Client implementation](https://gist.github.com/danielsiwiec/20deba324e85f3d61088)
* [Complete code for Resource implementation](https://gist.github.com/danielsiwiec/e91a24249d45b9d5df01)
