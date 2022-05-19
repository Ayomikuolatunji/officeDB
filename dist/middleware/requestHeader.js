"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestHeaders = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
};
exports.default = requestHeaders;
