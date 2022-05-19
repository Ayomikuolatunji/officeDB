"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _baseError_1 = __importDefault(require("./ baseError"));
class Api404Error extends _baseError_1.default {
    constructor(name, statusCode = 422, description = 'Not found.', isOperational = true) {
        super(name, statusCode, isOperational, description);
    }
}
exports.default = Api404Error;
