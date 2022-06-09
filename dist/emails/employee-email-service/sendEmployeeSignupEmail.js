"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transporter_1 = __importDefault(require("../transporter"));
const sendEmployeeSignupEmail = (email, name) => {
    var mailOptions = {
        from: 'ayomikuolatunji@gmail.com',
        to: email,
        subject: 'Ayoscript from onlineoffice.com',
        text: `Hello ${name} your account with this ${email} is created successfully successfully`,
        html: "<body><h5>You can login to your app with the link below</h5><div><a href='http://localhost:3000/login'>Login to your profile</a></div></body>"
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
exports.default = sendEmployeeSignupEmail;
