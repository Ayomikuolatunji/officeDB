"use strict";
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ayomikuolatunji',
        pass: 'rfigetyfhzcincej'
    },
    tls: {
        rejectUnauthorized: false
    }
});
module.exports = transporter;
