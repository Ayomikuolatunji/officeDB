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
exports.createCompanyAddress = exports.companiesEmployees = exports.allCompanyDepartments = exports.resetPassword = exports.forgotCompanyPassword = exports.loginCompanyAdmin = exports.createCompany = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const crypto_1 = __importDefault(require("crypto"));
const company_1 = __importDefault(require("../../models/company"));
const sendCompanyRegEmail_1 = __importDefault(require("../../emails/company-email-service/sendCompanyRegEmail"));
const sendForgotCompanyPassword_1 = __importDefault(require("../../emails/company-email-service/sendForgotCompanyPassword"));
const throwError_1 = require("../../middleware/throwError");
const createCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company_name = req.body.company_name;
        const company_type = req.body.company_type;
        const company_email = req.body.company_email;
        const company_password = req.body.company_password;
        const company_location = req.body.company_location;
        const companyExits = yield company_1.default.findOne({ company_email: company_email });
        if (companyExits) {
            (0, throwError_1.throwError)("Company already exist", http_status_codes_1.StatusCodes.CONFLICT);
        }
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
        // send email to company
        (0, sendCompanyRegEmail_1.default)(company_email, company_name);
    }
    catch (error) {
        next(error);
    }
});
exports.createCompany = createCompany;
const loginCompanyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company_email = req.body.company_email;
        const company_password = req.body.company_password;
        // check if company exists
        const findOneCompany = yield company_1.default.findOne({ company_email: company_email });
        // check if password is correct
        const hashPassword = yield bcrypt_1.default.compare(company_password, findOneCompany.company_password);
        // const hashPassword=await bcrypt.compare(company_password,findOneComapny.company_password)
        if (!hashPassword) {
            (0, throwError_1.throwError)("Invalid email or password", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        // generate token
        const token = jsonwebtoken_1.default.sign({
            company_email: findOneCompany.company_email,
        }, `somesupersecretsecret`, { expiresIn: "30d" });
        // send response
        res.status(200).json({ message: "Login successful", token: token, companyId: findOneCompany._id });
    }
    catch (error) {
        next(error);
    }
});
exports.loginCompanyAdmin = loginCompanyAdmin;
const forgotCompanyPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company_email = req.body.company_email;
        const findOneCompany = yield company_1.default.findOne({ company_email: company_email });
        // set expiration date on company model
        const resetTokenExpirationDate = Date.now() + 360000;
        // generate crypto token
        const cryptoToken = crypto_1.default.randomBytes(100).toString('hex');
        // save token to company
        yield company_1.default.findOneAndUpdate({ company_email: company_email }, {
            company_token: cryptoToken,
            resetTokenExpiration: resetTokenExpirationDate
        });
        // send email to company
        (0, sendForgotCompanyPassword_1.default)(company_email, findOneCompany.company_name, cryptoToken);
        res.status(200).json({ message: "Email sent successfully", companyId: findOneCompany._id });
    }
    catch (error) {
        next(error);
    }
});
exports.forgotCompanyPassword = forgotCompanyPassword;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company_token = req.body.company_token;
        const company_password = req.body.company_password;
        const hashedPw = yield bcrypt_1.default.hash(company_password, 12);
        const findOneCompany = yield company_1.default.findOne({ company_token: company_token });
        if (!findOneCompany) {
            (0, throwError_1.throwError)("Company not found", 404);
        }
        // update company password
        yield company_1.default.findOneAndUpdate({
            company_token: company_token,
            resetTokenExpiration: { $gt: Date.now() }
        }, {
            company_password: hashedPw,
            company_token: null
        });
        res.status(200).json({ message: "Password updated successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.resetPassword = resetPassword;
const allCompanyDepartments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyId = req.body.company_id;
        const findCompanyById = yield company_1.default.findById({
            _id: companyId
        });
        if (!findCompanyById) {
            (0, throwError_1.throwError)("please provide a valid", http_status_codes_1.StatusCodes.FORBIDDEN);
        }
        const populateCompanyDepartments = yield company_1.default.find({
            _id: companyId
        })
            .populate("company_departments")
            .select("company_departments");
        res.status(200).json({
            departments: populateCompanyDepartments
        });
    }
    catch (error) {
        next(error);
    }
});
exports.allCompanyDepartments = allCompanyDepartments;
const companiesEmployees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield company_1.default.find({})
            .populate("company_employes");
        if (!companies) {
            (0, throwError_1.throwError)("No companies found", 404);
        }
        res.status(200).json({ companies });
    }
    catch (error) {
        next(error);
    }
});
exports.companiesEmployees = companiesEmployees;
// company adddress
const createCompanyAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyId = req.body.company_id;
        const companyAddress = req.body.company_address;
        const company_city = req.body.company_city;
        const company_state = req.body.company_state;
        const company_country = req.body.company_country;
        const company_zip = req.body.company_zip;
        const company_phone = req.body.company_phone;
        const company_website = req.body.company_website;
        //create addres and push it to a company
        const newCompanyAddress = yield companyAddress.create({
            company_address: companyAddress,
            company_city: company_city,
            company_state: company_state,
            company_country: company_country,
            company_zip: company_zip,
            company_phone: company_phone,
            company_website: company_website,
            company_id: companyId
        });
        // push address to company
        yield company_1.default.findOneAndUpdate({ _id: companyId }, {
            $push: {
                company_address: newCompanyAddress._id
            }
        });
        // send response
        res.status(200).json({
            message: "Address created successfully",
            company_address: newCompanyAddress,
        });
        // find company address
    }
    catch (error) {
        next(error);
    }
});
exports.createCompanyAddress = createCompanyAddress;
