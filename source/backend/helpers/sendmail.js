const nodemailer = require('nodemailer');
const config = require('../config');

function sendEmailBySMTP(email) {

    const smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL, 
        // you can try with TLS, but port is then 587
        auth: {
            user: 'webprogwork@gmail.com', // Your email id
            pass: '$IPCA@2019#' // Your password
        }
    };

    const transporter = nodemailer.createTransport(smtpConfig);

    const mailOptions = {
        from: 'webprogwork@gmail.com', // sender address
        to: 'webprogwork@gmail.com', // list of receivers
        subject: email.subject, // Subject line
        //text: request.text, //, // plaintext body
        html: email.message // You can choose to send an HTML body instead
    }

    return transporter.sendMail(mailOptions);
}

module.exports.sendEmailBySMTP = sendEmailBySMTP;