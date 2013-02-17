var config = require('./config');

var httpreq = require('httpreq');
var _ = require("underscore");
var packagejson = require('./package.json');

var notifier;
switch(config.notification_type) {
    case 'pushover':
    var Pushover = require('node-pushover');
    notifier = new Pushover(config.pushover);
    break;

    case 'twilio':
    var Twilio = require('twilio');
    notifier = new Twilio(config.twilio.sid, config.twilio.authToken);

    case 'pushbullet':
    var PushBullet = require('node-pushbullet');
    notifier = new PushBullet(config.pushbullet.email, config.pushbullet.password);
    break;
}

var previousUrls = {};


function send(subject, message) {
    switch(config.notification_type) {
        case 'pushover':
        notifier.send(subject, message);
        break;

        case 'twilio':
        notifier.sendSms({
            to: config.twilio.to,
            from: config.twilio.from,
            body: message
        });

        case 'pushbullet':
        notifier.send('note', config.pushbullet.device, subject, message);
        break;
    }
}

if(config.notification_type == 'pushbullet') {
    notifier.on('ready', function() {
      loop();
    });
} else
    loop();

function loop(){
	getLatestPost(function (err, items) {
		if(err) {
			console.log("Error: ", err);
		} else {
			if(_.isEmpty(previousUrls)) {

				// Mark all items as read items
				_.each(items, function (item) {
					previousUrls[item.url] = true;
				});

				// send out a bootup message
				var bootupMsg = "Google I/O Watcher started, v" + packagejson.version;
				console.log(bootupMsg);
				send("Googie I/O Watcher", bootupMsg);

			} else {

				// check for new posts:
				_.each(items, function (item) {
					if(!_.has(previousUrls, item.url)) {
						console.log(item.title + ": " + item.url);
						send(item.title, item.url);
						previousUrls[item.url] = true;
					}

				});
			}
		}

		setTimeout(function(){
			loop();
		},120000);  // wait 2 minutes
	});
}


function getLatestPost(callback){
	httpreq.get("https://www.googleapis.com/plus/v1/activities",
		{
			parameters: {
				query : "#io13",
				orderBy: "recent", //best or recent
				maxResults: 20, // max = 20
				key: config.google.key
			}
		},
		function (err, res){
			if(err)
				return callback(err);

			var data = JSON.parse(res.body);

			if(data.error)
				return callback(data.error);

			if(data.items && data.items.length)
				callback(null, data.items);
			else
				callback(null, null);

		}
	);
}

