var config = require('./config');

var httpreq = require('httpreq');
var Pushover = require('./pushover');
var push = new Pushover(config.pushover);

var previousUrl = "";


loop();

function loop(){
	getLatestPost(function (err, item){
		if(!err && item.url != previousUrl){
			push.send(item.title, item.url);
			previousUrl = item.url;
		}else{
			if(err){
				console.log("Error:");
				console.log(err);
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
				maxResults: 1, // max = 20
				key: config.google.key
			}
		},
		function (err, res){
			if(err)
				return callback(err);

			var data = JSON.parse(res.body);

			if(data.error)
				return callback(data.error);

			callback(null, data.items[0]);

		}
	);
}

