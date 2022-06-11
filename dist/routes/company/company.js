"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const company_1 = require("../../controllers/company/company");
router.get("/all_companies", company_1.companiesEmployees);
router.post("/login_company_admin", company_1.loginCompanyAdmin);
router.post('/auth/create_company_account', company_1.createCompany);
exports.default = router;
