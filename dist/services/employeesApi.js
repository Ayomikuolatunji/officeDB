"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chats_1 = __importDefault(require("../routes/chats"));
const company_1 = __importDefault(require("../routes/company"));
const industries_1 = __importDefault(require("../routes/industries"));
const s3Route_1 = __importDefault(require("../routes/s3Route"));
const employee_1 = __importDefault(require("../routes/employee"));
const api = express_1.default.Router();
api.use("/office-api", industries_1.default);
api.use("/office-api", employee_1.default);
api.use('/office-api', chats_1.default);
api.use("/office-api/auth", company_1.default);
api.use("/office-api", s3Route_1.default);
exports.default = api;
