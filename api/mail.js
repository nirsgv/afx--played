const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');
const auth = require('../src/credentials.js');

const transporter = nodemailer.createTransport(mailgun(auth));

const sendMail = (email, subject, text) => {
    const mailOptions = {
        from: email,
        to: 'nirsegevmail@gmail.com',
        subject,
        text,
    };
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
};

module.exports = sendMail;
