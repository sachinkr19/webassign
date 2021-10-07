const accountSid = process.env.SID;
const authToken = process.env.TOKEN;
const from = process.env.SMS_FROM;
const messagingServiceSid = process.env.MESSAGE_SID;
//
const client = require("twilio")(accountSid, authToken);
function sendTextMessage(body, to) {
	client.messages
		.create({
			body,
			to,
			from,
			messagingServiceSid,
		})
		.then((message) => console.log(message))
		.catch((error) => console.log(error));
}
module.exports = { sendTextMessage };
