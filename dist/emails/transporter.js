"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
var transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'ayomikuolatunji',
        pass: 'rfigetyfhzcincej'
    },
    tls: {
        rejectUnauthorized: false
    }
});
exports.default = transporter;
