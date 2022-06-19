"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transporter_1 = __importDefault(require("../transporter"));
const sendForgotCompanyPassword = (email, company, token) => {
    const mailOptions = {
        from: 'ayomikuolatunji@gmail.com',
        to: email,
        subject: 'Ayoscript from onlineoffice.com',
        text: `Hello ${company} your request to reset password was granted and you can click this link to reset the admin password`,
        html: `<body><h5>You can reset your admin pasword by clicking on the link</h5><div><a href='http://localhost:3000/${token}'>Login to your profile</a></div></body>`
    };
    // send email after successful signup
    transporter_1.default.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error.message);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
    // 
};
exports.default = sendForgotCompanyPassword;
