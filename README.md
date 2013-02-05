node-google-io-watcher
======================

Node.js script to watch the #io13 feed for new messages

## What it does ##
It monitors the [#io13](https://plus.google.com/s/%23io13) hashtag on Google+ for new posts. I wrote it to be one of the first to get a ticket to Google I/O 2013. It uses the [Pushover service](https://pushover.net/) to send me push messages to my iPhone.

## Installation ##
Get the [Pushover app](https://pushover.net/), create an app and add a device. This should give you a ***token*** and a ***userkey***.

Get a Google+ key at https://code.google.com/apis/console/b/1/. Don't forget to enable Google+ at ***Services tab***

Edit __app/config.js__ with your Pushover keys and your Google+ key.

## Usage ##
Just run

```js
node app.js
```

From the app/ folder.

## Where to run it ##
Run it on a machine that's always on. I recommend [Digital Ocean](http://www.digitalocean.com). They rent clould servers for only 5 dollars a month.
