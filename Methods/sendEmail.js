const sgMail = require("@sendgrid/mail");
const API_KEY = process.env.KEY;
sgMail.setApiKey(API_KEY);
function sendMail(to, subject, text) {
	const message = {
		to,
		from: "sachinkumar.cse19@chitkarauniversity.edu.in",
		subject,
		text,
	};
	sgMail
		.send(message)
		.then((res) => console.log("sent"))
		.catch((e) => console.log(e.message));
}
module.exports = { sendMail };
