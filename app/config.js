exports.google = {
	key: "GOOGLE_API_KEY"
}

exports.pushover = {
	token: "APPTOKEN",
	user: "USERKEY"
}

exports.twilio = {
    sid: 'SID',
    authToken: 'AUTHTOKEN',
    from: '+18888238895', // Twilio phone number
    to: '+18888238895' // Your phone number
}

exports.pushbullet = {
    email: 'your-email@domain.com',
    password: 'your-password',
    device: 'XXXX'
}

exports.notification_type = 'pushover' // Either 'twilio' or 'pushover' or 'pushbullet'
