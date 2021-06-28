const sgMail = require('@sendgrid/mail')
require('dotenv').config();   
const API_KEY = process.env.SENDGRID_KEY;

sgMail.setApiKey("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")

module.exports = (message) => {
    sgMail.send(message).then(response => {
        console.log(response);
        console.log('email sent');

    }).catch((err) => {
        console.log(err);
    })
}