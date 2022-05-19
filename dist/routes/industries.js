"use strict";
const express = require("express");
const prepareAllIndustryApi = require("../controllers/industries");
const router = express.Router();
router.get('/all-country-lists', prepareAllIndustryApi);
module.exports = router;
