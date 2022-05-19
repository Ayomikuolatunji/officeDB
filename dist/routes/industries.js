"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const industries_1 = require("../controllers/industries");
const router = (0, express_1.Router)();
router.get('/all-country-lists', industries_1.getAllIndustry);
exports.default = router;
