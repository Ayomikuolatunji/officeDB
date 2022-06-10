"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chats_1 = __importDefault(require("../routes/chats/chats"));
const company_1 = __importDefault(require("../routes/company/company"));
const industries_1 = __importDefault(require("../routes/industries/industries"));
const s3Route_1 = __importDefault(require("../routes/s3routes/s3Route"));
const employee_1 = __importDefault(require("../routes/employees/employee"));
const departments_1 = __importDefault(require("../routes/departments/departments"));
const api = express_1.default.Router();
// version1 apis
api.use('/office-api', departments_1.default);
api.use("/office-api", industries_1.default);
api.use("/office-api", employee_1.default);
api.use('/office-api', chats_1.default);
api.use("/office-api", company_1.default);
api.use("/office-api", s3Route_1.default);
exports.default = api;
