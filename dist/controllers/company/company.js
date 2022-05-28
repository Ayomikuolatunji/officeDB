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
exports.companiesEmployees = exports.createCompany = void 0;
const company_1 = __importDefault(require("../../models/company"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const transporter_1 = __importDefault(require("../../email/transporter"));
const createCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const company_name = req.body.company_name;
    const company_type = req.body.company_type;
    const company_email = req.body.company_email;
    const company_password = req.body.company_password;
    const company_location = req.body.company_location;
    const companyExits = yield company_1.default.findOne({ email: company_email });
    if (companyExits) {
        res.status(422).json({ message: "company already exits" });
    }
    try {
        const hashedPw = yield bcrypt_1.default.hash(company_password, 12);
        const newCompany = new company_1.default({
            company_email: company_email,
            company_location: company_location,
            company_type: company_type,
            company_name: company_name,
            company_password: hashedPw
        });
        const result = yield newCompany.save();
        res.status(201).json({ message: "Company account created successfully", companyId: result._id });
        const mailOptions = {
            from: 'ayomikuolatunji@gmail.com',
            to: company_email,
            subject: 'Ayoscript from onlineoffice.com',
            text: `Hello ${company_name} your account with this ${company_email} is created sucess fully successfully`,
            html: "<body><h5>You can login to your app with the link below</h5><div><a href='http://localhost:3000/login'>Login to your profile</a></div></body>"
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
    }
    catch (error) {
        res.status(500).json({ message: "Internal servel error detected" });
        next(error);
    }
});
exports.createCompany = createCompany;
const companiesEmployees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield company_1.default.find({}).populate("company_employes");
        if (!users) {
            const error = new Error(`user empty`);
            // error.statusCode=422
            throw error;
        }
        res.status(200).json({ users });
    }
    catch (error) {
        // if(!error.statusCode){
        //      error.statusCode=500
        //  }
        next(error);
    }
});
exports.companiesEmployees = companiesEmployees;
