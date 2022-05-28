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
const employee_1 = __importDefault(require("../models/employee"));
const uploadSetUp_1 = __importDefault(require("../aws/uploadSetUp"));
const transporter_1 = __importDefault(require("../transporter/transporter"));
module.exports = {
    update_Profile_Picture: (profile, req) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //    if the client does not exist or empty id throw error
            if (!profile.id) {
                const error = new Error("No id provided");
                error.statusCode = 422;
                throw error;
            }
            // throw error if key and data returns empty strung from client
            if (profile.update_picture.key === "" || profile.update_picture.data === "") {
                const error = new Error("empty entity");
                error.statusCode = 422;
                throw error;
            }
            //  upload to s3 bucket 
            yield (0, uploadSetUp_1.default)({
                Bucket: "officedbfiles",
                key: profile.update_picture.key,
                data: profile.update_picture.data,
                ContentType: "image/jpeg"
            });
            // get aws s3 object url
            const s3Url = `https://officedbfiles.s3.amazonaws.com/${profile.update_picture.key}`;
            //update userprofilepicture   
            const updateProfilePicture = yield employee_1.default.findOneAndUpdate({ _id: profile.id }, {
                avartImage: s3Url,
                avatarImageSet: true
            });
            //  if no profile picture found
            if (!updateProfilePicture) {
                const error = new Error("Not updated");
                error.statusCode = 422;
                throw error;
            }
            //  update our databse 
            return Object.assign(Object.assign({}, updateProfilePicture._doc), { _id: updateProfilePicture._id.toString() });
        }
        catch (error) {
            //    handle error
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            throw error;
        }
    }),
    // update employee username
    update_Profile_Username: (profile, req) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!profile.id) {
                const error = new Error("Can't find Id");
                error.statusCode = 404;
                throw error;
            }
            const findUser = yield employee_1.default.findByIdAndUpdate({ _id: profile.id }, {
                username: profile.update_username.username
            });
            if (!findUser) {
                const error = new Error("No user with this id found");
                error.statusCode = 404;
                throw error;
            }
            return Object.assign(Object.assign({}, findUser._doc), { _id: findUser._id.toString() });
        }
        catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            throw error;
        }
    }),
    // update employee(user) role
    update_Employee_Role: (profile, req) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!profile.id) {
                const error = new Error("Invalid id");
                error.statusCode = 422;
                throw error;
            }
            const findEmployee = yield employee_1.default.findByIdAndUpdate({ _id: profile.id }, {
                role: profile.role_update.role
            });
            if (!findEmployee) {
                const error = new Error(`No employee found`);
                error.statusCode = 404;
                throw error;
            }
            return Object.assign(Object.assign({}, findEmployee._doc), { _id: findEmployee._id.toString() });
        }
        catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            throw error;
        }
    }),
    update_Employee_Email: (profile, req) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!profile.id) {
                const error = new Error("Invalid id");
                error.statusCode = 422;
                throw error;
            }
            const findEmployee = yield employee_1.default.findByIdAndUpdate({ _id: profile.id }, {
                email: profile.email_update.email
            });
            if (!findEmployee) {
                const error = new Error(`No employee found`);
                error.statusCode = 404;
                throw error;
            }
            // send mail to employee after successfully email update
            var mailOptions = {
                from: 'ayomikuolatunji@gmail.com',
                to: findEmployee.email,
                subject: 'Ayoscript from onlineoffice.com',
                text: `Hello ${findEmployee.username} your account with this ${findEmployee.email} is created successfully successfully`,
                html: "<body><h5>Your email has been successfully updated </h5><div></div></body>"
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
            return Object.assign(Object.assign({}, findEmployee._doc), { _id: findEmployee._id.toString() });
        }
        catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            throw error;
        }
    }),
    update_Employee_About: (profile, req) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!profile.id) {
                const error = new Error("Invalid id");
                error.statusCode = 422;
                throw error;
            }
            const findEmployee = yield employee_1.default.findByIdAndUpdate({ _id: profile.id }, {
                about: profile.about_update.about
            });
            if (!findEmployee) {
                const error = new Error(`No employee found`);
                error.statusCode = 404;
                throw error;
            }
            return Object.assign(Object.assign({}, findEmployee._doc), { _id: findEmployee._id.toString() });
        }
        catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            throw error;
        }
    }),
    update_Employee_Location: (profile, req) => __awaiter(void 0, void 0, void 0, function* () {
        if (!profile.id) {
            const error = new Error("Id is invalid");
            error.statusCode = 422;
            throw error;
        }
        const findEmployee = yield employee_1.default.findByIdAndUpdate({ _id: profile.id }, {
            location: profile.location_update.location
        });
        if (!findEmployee) {
            const error = new Error("user not found");
            error.statusCode = 404;
            throw error;
        }
        return Object.assign(Object.assign({}, findEmployee._doc), { _id: findEmployee._id.toString() });
    })
};
