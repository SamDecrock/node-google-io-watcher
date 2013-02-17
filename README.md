node-google-io-watcher
======================

Node.js script to watch the #io13 feed for new messages

## What it does ##
It monitors the [#io13](https://plus.google.com/s/%23io13) hashtag on Google+ for new posts. I wrote it to be one of the first to get a ticket to Google I/O 2013. It uses the [Pushover service](https://pushover.net/) or [PushBullet service](https://www.pushbullet.com/) to send push messages to an iPhone or Android device or to any phone via SMS using [Twilio](https://www.twilio.com).

## Installation ##
#### Notification ####
##### Pushover #####
Get the [Pushover app](https://pushover.net/), create an app and add a device. This should give you a ***token*** and a ***userkey***.

Or

Get the [PushBullet service](https://www.pushbullet.com/) and add a device.

##### Twilio #####
Create a [Twilio](https://www.twilio.com) account and get the ***account sid***, the ***auth token*** and the ***incoming number***.

#### Google+ ####
Get a Google+ key at https://code.google.com/apis/console/b/1/. Don't forget to enable Google+ at ***Services tab***

Edit __app/config.js__ with your notification information and your Google+ key.

## Usage ##
Just run

```js
node app.js
```

From the app/ folder.

#### Run it as a service ####
Use [forever](https://github.com/nodejitsu/forever) to run the application in the background.

```
[sudo] npm install forever -g
forever start app.js
```

## Where to run it ##
Run it on a machine that's always on. I recommend [Digital Ocean](http://www.digitalocean.com). They offer clould servers for only $5/month.

## Contributions ##
Thanks to [Kristian Mide](https://github.com/fasmide) for fixing a logical error :-)

