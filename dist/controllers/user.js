"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const crypto = require("crypto");
const transporter = require("../email/transporter");
const User = require("../models/user");
const Company = require("../models/company");
const registration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    // get client data from request body   
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    // find user
    const userExist = yield User.findOne({ email: email });
    // check if there is a user with the client email
    if (userExist) {
        const error = new Error("User already exist with this email");
        error.statusCode = 422;
        throw error;
    }
    try {
        const hashedPw = yield bcrypt.hash(password, 12);
        const user = new User({
            email,
            username,
            role,
            password: hashedPw,
        });
        yield user.save();
        res.status(201).json({ message: 'Employee account created successfully!', employeeId: user._id });
        // send mail to employee after successfully signup
        var mailOptions = {
            from: 'ayomikuolatunji@gmail.com',
            to: email,
            subject: 'Ayoscript from onlineoffice.com',
            text: `Hello ${username} your account with this ${email} is created successfully successfully`,
            html: "<body><h5>You can login to your app with the link below</h5><div><a href='http://localhost:3000/login'>Login to your profile</a></div></body>"
        };
        // send email after successful signup
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
        //  catch errors
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = yield User.findOne({ email: email });
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        const isEqual = yield bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: user.email,
            userId: user._id.toString()
        }, 'somesupersecretsecret', { expiresIn: '30d' });
        res.status(200).json({ token: token, employeeId: user._id });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
const oneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield User.findById({ _id: id });
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 40;
            throw error;
        }
        res.status(200).json({ user: user });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
const profilePicture = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        const error = new Error(`Cant uplaod image with this ${id}`);
        error.statusCode = 422;
        throw error;
    }
    const avartImage = req.body.avartImage;
    const avatarImageSet = req.body.avatarImageSet;
    try {
        const user = yield User.findOneAndUpdate({ _id: id }, {
            avatarImageSet: avatarImageSet,
            avartImage: avartImage
        });
        return res.status(200).json({ msg: user });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find({}).select([
            "email",
            "username",
            "avartImage",
            "_id"
        ]);
        if (!users) {
            const error = new Error(`No user found`);
            error.statusCode = 422;
            throw error;
        }
        res.status(200).json({ users });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const findOne = yield User.findById({ _id: id });
        if (!findOne) {
            const error = new Error("No user find  with the id undefined");
            error.statusCode = 404;
            throw error;
        }
        const companyId = yield User.findById({ _id: findOne._id }).populate("company");
        res.status(StatusCodes.OK).json({ message: ReasonPhrases.ACCEPTED });
        console.log(companyId);
        // 
        yield Company.findOneAndUpdate({ company_email: companyId.company.company_email }, { $pull: { company_employes: findOne._id }
        });
        // after remiving the reference from company schema the delete user
        const deleteUser = yield User.findByIdAndDelete({ _id: findOne._id });
        // send emails after deleting account
        var mailOptions = {
            from: 'ayomikuolatunji@gmail.com',
            to: deleteUser.email,
            subject: 'Ayoscript from onlineoffice.com',
            text: `Hello ${findOne.username} your account with this ${findOne.email} deactivated permanently`,
            html: `<body><h5>You deleted your account with ${companyId.company.company_name} and you are no longer with the company on our platformz</h5></body>`
        };
        // send email after successful signup
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const user = yield User.findOne({ email: email });
        if (!user) {
            const error = new Error("No user with the email found");
            error.statusCode = 404;
            throw error;
        }
        const random = crypto.randomBytes(300);
        if (!random) {
            return console.log("err");
        }
        const token = random.toString("hex");
        res.status(200).json({ message: "Email sent to " + user.email });
        var mailOptions = {
            from: 'ayomikuolatunji@gmail.com',
            to: email,
            subject: 'Ayoscript from onlineoffice.com',
            text: `Your request to change password with ${email} is sent `,
            html: `<body><h5>You set your password with the link below</h5><div><a href='http://localhost:3000/reset-password/new-password?code=${token}&id=${user._id}'>Click to correct password</a></div></body>`
        };
        // send email after successful signup
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    catch (err) {
        console.log(err);
        next();
    }
});
const correctPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const password = req.body.password;
    const userId = req.body.userId;
    const resetToken = req.body.resetToken;
    const user = yield User.findById({ _id: userId });
    if (user || resetToken || userId) {
        const resetPassword = yield bcrypt.hash(password, 12);
        yield User.findOneAndUpdate({ _id: user._id }, {
            password: resetPassword,
        });
        res.status(200).json({ user: user._id });
        var mailOptions = {
            from: 'ayomikuolatunji@gmail.com',
            to: user.email,
            subject: 'Ayoscript from onlineoffice.com',
            text: `Your request to change password with ${user.email} is sucessful `,
            html: `<body><h5>Your password has been reset </h5><div><a href='http://localhost:3000/login'>Login to your profile</a></div></body>`
        };
        // send email after successful signup
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    else {
        const error = new Error("You are not allowed");
        error.statusCode = 404;
        throw error;
    }
});
const populateEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});
module.exports = {
    registration,
    login,
    oneUser,
    profilePicture,
    getAllUsers,
    deleteUser,
    resetPassword,
    correctPassword,
    populateEmployee
};
