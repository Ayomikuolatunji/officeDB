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
exports.getEmployeeCompaines = exports.addEmployeeToCompany = exports.correctPassword = exports.resetPassword = exports.deleteEmployee = exports.getAllEmployees = exports.profilePicture = exports.singleEmployee = exports.login = exports.registration = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const validation_result_1 = require("express-validator/src/validation-result");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const crypto_1 = __importDefault(require("crypto"));
const mongodb_1 = require("mongodb");
const transporter_1 = __importDefault(require("../../email-service/transporter"));
const employee_1 = __importDefault(require("../../models/employee"));
const company_1 = __importDefault(require("../../models/company"));
const throwError_1 = require("../../middleware/throwError");
const sendEmployeeSignupEmail_1 = __importDefault(require("../../email-service/sendEmployeeSignupEmail"));
const sendDeleteEmployeeEmail_1 = __importDefault(require("../../email-service/sendDeleteEmployeeEmail"));
const registration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get client data from request body   
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const role = req.body.role;
        const errors = (0, validation_result_1.validationResult)(req);
        if (!errors.isEmpty()) {
            (0, throwError_1.throwError)("Invalid data", 400);
        }
        // send error to the client if the inputs are empty
        if (!email || !username || !password || !role) {
            (0, throwError_1.throwError)("No input field must be empty", 400);
        }
        // find user
        const userExist = yield employee_1.default.findOne({ email: email });
        // check if there is a user with the client email
        if (userExist) {
            (0, throwError_1.throwError)("User already exist", http_status_codes_1.StatusCodes.CONFLICT);
        }
        const hashedPw = yield bcrypt_1.default.hash(password, 12);
        const user = new employee_1.default({
            email,
            username,
            role,
            password: hashedPw,
        });
        yield user.save();
        // send request and email to the employee
        res.status(201).json({ message: 'Employee account created successfully!', employeeId: user._id });
        // send mail to employee after successfully signup
        (0, sendEmployeeSignupEmail_1.default)(email, username);
        //  catch errors
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.registration = registration;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = yield employee_1.default.findOne({ email: email });
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 404;
            throw error;
        }
        const isEqual = yield bcrypt_1.default.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 422;
            throw error;
        }
        const token = jsonwebtoken_1.default.sign({
            email: user.email,
            userId: user._id.toString()
        }, 'somesupersecretsecret', { expiresIn: '30d' });
        res.status(200).json({ token: token, employeeId: user._id });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const singleEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield employee_1.default.findById({ _id: id });
        if (!user) {
            (0, throwError_1.throwError)("A user with the provided could not be found.", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        res.status(200).json({ user: user });
    }
    catch (error) {
        next(error);
    }
});
exports.singleEmployee = singleEmployee;
const profilePicture = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        (0, throwError_1.throwError)("No id provided or id is invalid", http_status_codes_1.StatusCodes.BAD_REQUEST);
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
            (0, throwError_1.throwError)("Employees data not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        res.status(200).json({ users });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllEmployees = getAllEmployees;
const deleteEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const findOne = yield employee_1.default.findById({ _id: id });
        if (!findOne) {
            (0, throwError_1.throwError)("Employee not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const companyId = yield employee_1.default.findById({ _id: findOne._id }).populate("company");
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: http_status_codes_1.ReasonPhrases.ACCEPTED });
        console.log(companyId);
        // 
        yield company_1.default.findOneAndUpdate({ company_email: companyId.company.company_email }, { $pull: { company_employes: findOne._id }
        });
        // after remiving the reference from company schema the delete user
        const deleteUser = yield employee_1.default.findByIdAndDelete({ _id: findOne._id });
        // send email to an employee  after deleting an account
        (0, sendDeleteEmployeeEmail_1.default)(deleteUser.email, deleteUser.username, companyId.company.company_name);
        // catch errors
    }
    catch (error) {
        next(error);
    }
});
exports.deleteEmployee = deleteEmployee;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const user = yield employee_1.default.findOne({ email: email });
        if (!user) {
            (0, throwError_1.throwError)("User not found", http_status_codes_1.StatusCodes.NOT_FOUND);
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
            html: `<body><h5>You set your password with the link below</h5><div><a href='http://localhost:3000/forgot-password/new-password?code=${token}&id=${user._id}'>Click to correct password</a></div></body>`
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
        next(error);
    }
});
exports.resetPassword = resetPassword;
const correctPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const password = req.body.password;
        const employeeId = req.body.userId;
        const resetToken = req.body.resetToken;
        const employee = yield employee_1.default.findById({ _id: employeeId });
        if (employee || resetToken || employeeId) {
            const resetPassword = yield bcrypt_1.default.hash(password, 12);
            yield employee_1.default.findOneAndUpdate({ _id: employee._id }, {
                password: resetPassword,
            });
            res.status(200).json({ employee: employee._id });
            var mailOptions = {
                from: 'ayomikuolatunji@gmail.com',
                to: employee.email,
                subject: 'Ayoscript from onlineoffice.com',
                text: `Your request to change password with ${employee.email} is sucessful `,
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
            (0, throwError_1.throwError)("Your are not allowed to set new password", http_status_codes_1.StatusCodes.FORBIDDEN);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.correctPassword = correctPassword;
const addEmployeeToCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company_name = req.body.company_name;
        const companyId = req.body.companyId;
        const employeeId = req.params.id;
        // find the employee by id
        if (!employeeId) {
            (0, throwError_1.throwError)("No employee found with the provided ID or invalid ID", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        if (!companyId) {
            (0, throwError_1.throwError)("No company with an ID found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        if (!company_name) {
            (0, throwError_1.throwError)("No company with an name found", 422);
        }
        const employee = yield employee_1.default.findById({ _id: employeeId });
        if (!mongodb_1.ObjectId.isValid(companyId)) {
            (0, throwError_1.throwError)("You provided an invalid company ID", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        // find the company by id and company name
        const company = yield company_1.default.findById({ _id: companyId });
        // if no employee found throw error
        if (!employee) {
            (0, throwError_1.throwError)("Employee not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        // if no company found throw error
        if (!company) {
            (0, throwError_1.throwError)("Company not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        // // check if the company name provided is the same as the company name in the database
        if (company.company_name !== company_name) {
            (0, throwError_1.throwError)("You are not allowed to join this company or invalid company name or ID", http_status_codes_1.StatusCodes.FORBIDDEN);
        }
        // check if the company id is not eual to the company _id
        // check if company exists in employee schema
        if (employee.companies.includes(companyId)) {
            (0, throwError_1.throwError)("You are already a member of this company", http_status_codes_1.StatusCodes.FORBIDDEN);
        }
        else {
            employee.companies.push(companyId);
            yield employee.save();
        }
        // update employee id to company_employes array
        company.company_employes.push(employeeId);
        yield company.save();
        return res.status(200).json({ message: `employee added sucessfully to company ${company.company_name}` });
    }
    catch (error) {
        next(error);
    }
});
exports.addEmployeeToCompany = addEmployeeToCompany;
const getEmployeeCompaines = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeId = req.params.id;
        const employees = yield employee_1.default.findById({ _id: employeeId })
            .populate({
            path: 'companies',
            populate: {
                path: 'company_employes',
            }
        });
        if (!employees) {
            (0, throwError_1.throwError)("No employee found with the provided ID or invalid ID", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        res.status(200).json({ employee_companies: employees.companies });
    }
    catch (error) {
        next(error);
    }
});
exports.getEmployeeCompaines = getEmployeeCompaines;
