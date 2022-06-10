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
exports.createCompanyDepartments = void 0;
const company_1 = __importDefault(require("../../models/company"));
const departments_1 = __importDefault(require("../../models/departments"));
const createCompanyDepartments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyId = req.body.companyId.companyId;
        const departments = req.body.departments.departments;
        const createDepartment = yield departments_1.default.create({
            department: departments
        });
        const findCompany = yield company_1.default.findById({ _id: companyId });
        yield findCompany.company_departments.push(createDepartment);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createCompanyDepartments = createCompanyDepartments;
