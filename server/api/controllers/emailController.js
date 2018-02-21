const nodemailer = require('nodemailer');

exports.sendEmail = function(emailData){
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: emailData.email,
		pass: emailData.password
	},

});

const mailOptions = {
	from: emailData.email,
	to: 'newmanp97@gmail.com',
	subject: emailData.subject,
	text: emailData.msg
};


transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
};

