"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const company_1 = require("../controllers/company");
router.get("/all_companies_employees", company_1.companiesEmployees);
router.post('/create_company_account', company_1.createCompany);
exports.default = router;
