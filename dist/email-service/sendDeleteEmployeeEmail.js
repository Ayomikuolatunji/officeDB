"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transporter_1 = __importDefault(require("./transporter"));
const sendDeleteEmployeeEmail = (email, username, company_name) => {
    // send emails after deleting account
    var mailOptions = {
        from: 'ayomikuolatunji@gmail.com',
        to: email,
        subject: 'Ayoscript from onlineoffice.com',
        text: `Hello ${username} your account with this ${email} deactivated permanently`,
        html: `<body><h5>You deleted your account with ${company_name} and you are no longer with the company on our platformz</h5></body>`
    };
    // send email after successful signup
    transporter_1.default.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
};
exports.default = sendDeleteEmployeeEmail;
