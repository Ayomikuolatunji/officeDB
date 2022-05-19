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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.correctPassword = exports.resetPassword = exports.deleteEmployee = exports.getAllEmployees = exports.profilePicture = exports.singleEmployee = exports.login = exports.registration = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const validation_result_1 = require("express-validator/src/validation-result");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const crypto_1 = __importDefault(require("crypto"));
const transporter_1 = __importDefault(require("../email/transporter"));
const employee_1 = __importDefault(require("../models/employee"));
const company_1 = __importDefault(require("../models/company"));
const registration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, validation_result_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        // error.statusCode = 422;
        throw error;
    }
    // get client data from request body   
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    // find user
    const userExist = yield employee_1.default.findOne({ email: email });
    // check if there is a user with the client email
    if (userExist) {
        const error = new Error("User already exist with this email");
        error.statusCode = 422;
        throw error;
    }
    try {
        const hashedPw = yield bcrypt_1.default.hash(password, 12);
        const user = new employee_1.default({
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
        transporter_1.default.sendMail(mailOptions, function (error, info) {
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
        //  if (!err.statusCode) {
        //    err.statusCode = 500;
        //  }
        next(err);
    }
});
exports.registration = registration;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = yield employee_1.default.findOne({ email: email });
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            // error.statusCode = 401;
            throw error;
        }
        const isEqual = yield bcrypt_1.default.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            // error.statusCode = 401;
            throw error;
        }
        const token = jsonwebtoken_1.default.sign({
            email: user.email,
            userId: user._id.toString()
        }, 'somesupersecretsecret', { expiresIn: '30d' });
        res.status(200).json({ token: token, employeeId: user._id });
    }
    catch (err) {
        // if (!err.statusCode) {
        //   err.statusCode = 500;
        // }
        next(err);
    }
});
exports.login = login;
const singleEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield employee_1.default.findById({ _id: id });
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            // error.statusCode = 40;
            throw error;
        }
        res.status(200).json({ user: user });
    }
    catch (error) {
        // if(!error.statusCode){
        //   error.statusCode=500
        // }
        next(error);
    }
});
exports.singleEmployee = singleEmployee;
const profilePicture = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        const error = new Error(`Cant uplaod image with this ${id}`);
        // error.statusCode=422
        throw error;
    }
    const avartImage = req.body.avartImage;
    const avatarImageSet = req.body.avatarImageSet;
    try {
        const user = yield employee_1.default.findOneAndUpdate({ _id: id }, {
            avatarImageSet: avatarImageSet,
            avartImage: avartImage
        });
        return res.status(200).json({ msg: user });
    }
    catch (error) {
        //   if(!error.statusCode){
        //   error.statusCode=500
        //  }
        next(error);
    }
});
exports.profilePicture = profilePicture;
const getAllEmployees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield employee_1.default.find({}).select([
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
exports.getAllEmployees = getAllEmployees;
const deleteEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const findOne = yield employee_1.default.findById({ _id: id });
        if (!findOne) {
            const error = new Error("No user find  with the id undefined");
            // error.statusCode=404
            throw error;
        }
        const companyId = yield employee_1.default.findById({ _id: findOne._id }).populate("company");
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: http_status_codes_1.ReasonPhrases.ACCEPTED });
        console.log(companyId);
        // 
        yield company_1.default.findOneAndUpdate({ company_email: companyId.company.company_email }, { $pull: { company_employes: findOne._id }
        });
        // after remiving the reference from company schema the delete user
        const deleteUser = yield employee_1.default.findByIdAndDelete({ _id: findOne._id });
        // send emails after deleting account
        var mailOptions = {
            from: 'ayomikuolatunji@gmail.com',
            to: deleteUser.email,
            subject: 'Ayoscript from onlineoffice.com',
            text: `Hello ${findOne.username} your account with this ${findOne.email} deactivated permanently`,
            html: `<body><h5>You deleted your account with ${companyId.company.company_name} and you are no longer with the company on our platformz</h5></body>`
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
    }
    catch (error) {
        // if(!error.statusCode){
        //   error.statusCode=500
        // }
        next(error);
    }
});
exports.deleteEmployee = deleteEmployee;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const user = yield employee_1.default.findOne({ email: email });
        if (!user) {
            const error = new Error("No user with the email found");
            // error.statusCode=404
            throw error;
        }
        const random = crypto_1.default.randomBytes(300);
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
        transporter_1.default.sendMail(mailOptions, function (error, info) {
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
exports.resetPassword = resetPassword;
const correctPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const password = req.body.password;
    const userId = req.body.userId;
    const resetToken = req.body.resetToken;
    const user = yield employee_1.default.findById({ _id: userId });
    if (user || resetToken || userId) {
        const resetPassword = yield bcrypt_1.default.hash(password, 12);
        yield employee_1.default.findOneAndUpdate({ _id: user._id }, {
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
        transporter_1.default.sendMail(mailOptions, function (error, info) {
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
        // error.statusCode=404
        throw error;
    }
});
exports.correctPassword = correctPassword;
const populateEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});
