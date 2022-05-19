"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const employee_1 = __importDefault(require("../models/employee"));
const employee_2 = require("../controllers/employee");
const router = (0, express_1.Router)();
router
    .get("/auth/all_employees", employee_2.getAllEmployees)
    .post("/auth/register_employee", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Enter valid email address").custom((value, { req }) => {
        return employee_1.default.findOne({ email: value })
            .then(userDoc => {
            if (userDoc) {
                return Promise.reject("user already exist");
            }
        })
            .catch(err => {
            console.log(err);
        });
    }).normalizeEmail(),
    (0, express_validator_1.body)("username").trim(),
    (0, express_validator_1.body)("password").trim()
], employee_2.registration);
router.post("/auth/employee_login", employee_2.login);
router.post("/auth/reset_employee_password", employee_2.resetPassword);
router.post("/auth/set_employee_newpassword", employee_2.correctPassword);
router.get("auth/:id", employee_2.singleEmployee);
router.post("/auth/employee_profile_picture/:id", employee_2.profilePicture);
router.delete("/auth/delete_employee/:id", employee_2.deleteEmployee);
router.post("/auth/add_employee_to_company/:id");
exports.default = router;
