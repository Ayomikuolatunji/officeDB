"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorPage = (req, res, next) => {
    res.status(404).json({ message: "Route page found" });
};
exports.default = ErrorPage;
