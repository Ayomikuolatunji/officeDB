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
exports.updateCompanyDepartments = exports.createCompanyDepartments = void 0;
const http_status_codes_1 = require("http-status-codes");
const throwError_1 = require("../../middleware/throwError");
const company_1 = __importDefault(require("../../models/company"));
const departments_1 = __importDefault(require("../../models/departments"));
const createCompanyDepartments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyId = req.body.companyId;
        const department_name = req.body.department_name;
        if (!companyId) {
            (0, throwError_1.throwError)("provided a valid company id", 404);
        }
        if (!department_name) {
            (0, throwError_1.throwError)('provide department name', 404);
        }
        const createDepartment = yield departments_1.default.create({
            department: department_name
        });
        const findCompany = yield company_1.default.findById({ _id: companyId });
        findCompany.company_departments.push(createDepartment._id);
        findCompany.save();
        res.status(200).json(findCompany);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createCompanyDepartments = createCompanyDepartments;
const updateCompanyDepartments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyId = req.body.companyId;
        const department = req.body.department;
        const departmentId = req.body.department;
        if (companyId || department) {
            (0, throwError_1.throwError)("Companid or department not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const findADepartment = yield departments_1.default.findById({});
    }
    catch (error) {
        next(error);
    }
});
exports.updateCompanyDepartments = updateCompanyDepartments;
