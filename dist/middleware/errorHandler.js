"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    console.log(error.message);
    const message = error.message || "encounter error";
    const status = error.statusCode || 500;
    res.status(status).json({ message: message, error: "Error message" });
    next();
};
exports.default = errorHandler;
