"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const companyAddress = new mongoose_1.default.Schema({
    company_address: {
        type: String,
        required: true,
        default: "",
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    company_city: {
        type: String,
        required: true,
        default: "",
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    company_state: {
        type: String,
        required: true,
        default: "",
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    company_country: {
        type: String,
        required: true,
        default: "",
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    company_zip: {
        type: Number,
        required: true,
        default: "",
        trim: true,
        maxlength: 6,
    },
    company_phone: {
        type: String,
        required: true,
        default: "",
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    company_website: {
        type: String,
        required: true,
        default: "",
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("companyAddress", companyAddress);
