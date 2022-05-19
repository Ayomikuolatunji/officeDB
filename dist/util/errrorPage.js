"use strict";
const ErrorPage = (req, res, next) => {
    res.status(404).json({ message: "Route page found" });
};
module.exports = ErrorPage;
