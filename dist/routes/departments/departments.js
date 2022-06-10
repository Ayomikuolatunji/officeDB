"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const departments_1 = require("../../controllers/departments/departments");
const router = express_1.default.Router();
router.post("/auth/create-department_for_companies", departments_1.createCompanyDepartments);
exports.default = router;
