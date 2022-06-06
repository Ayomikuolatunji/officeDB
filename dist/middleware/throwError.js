"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const ErrorHandler = (errorMsg, statusCode) => {
    const error = new Error(errorMsg);
    error.statusCode = 404;
    throw error;
};
exports.ErrorHandler = ErrorHandler;
