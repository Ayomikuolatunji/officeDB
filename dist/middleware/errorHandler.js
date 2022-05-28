"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    const message = error.message || "encounter error";
    const status = error.statusCode || 500;
    res.status(status).json({ message: message, error: "Error message", errorStatus: status });
};
exports.default = errorHandler;
