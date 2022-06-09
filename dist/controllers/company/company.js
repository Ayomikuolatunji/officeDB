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
const createCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company_name = req.body.company_name;
        const company_type = req.body.company_type;
        const company_email = req.body.company_email;
        const company_password = req.body.company_password;
        const company_location = req.body.company_location;
        const companyExits = yield company_1.default.findOne({ company_email: company_email });
        if (companyExits) {
            const error = new Error("company already exists");
            error.statusCode = 400;
            throw error;
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
    }
    catch (error) {
        next(error);
    }
});
exports.createCompany = createCompany;
const companiesEmployees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield company_1.default.find({})
            .populate("company_employes");
        if (!companies) {
            const error = new Error(`company not found `);
            error.statusCode = 422;
            throw error;
        }
        res.status(200).json({ companies });
    }
    catch (error) {
        next(error);
    }
});
exports.companiesEmployees = companiesEmployees;
