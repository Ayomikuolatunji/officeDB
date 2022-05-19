"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const employee_1 = __importDefault(require("../models/employee"));
const { registration, login, oneUser, profilePicture, getAllUsers, deleteUser, resetPassword, correctPassword } = require("../controllers/user");
const router = express_1.default.Router();
router
    .get("/all_users", getAllUsers)
    .post("/register", [
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
], registration);
router.post("/login", login);
router.post("/reset_password", resetPassword);
router.post("/set_newpassword", correctPassword);
router.get("/:id", oneUser);
router.post("/profile_picture/:id", profilePicture);
router.delete("/delete_user/:id", deleteUser);
router.post("/add_employee_to_company/:id");
exports.default = router;
