"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_1 = __importDefault(require("../routes/company/company"));
const api = express_1.default.Router();
api.use("/office-api/auth", company_1.default);
exports.default = api;
