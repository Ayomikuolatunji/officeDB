"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const router = express.Router();
const uploadToS3 = require("../aws/uploadSetUp");
const User = require("../models/user");
router.post("/upload", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body.data;
    const key = req.body.key;
    yield uploadToS3({
        key: key,
        data: data
    });
    const s3Url = `https://${'college-sigunp-image'}.s3.amazonaws.com/${key}`;
    const finderUser = yield User.findOneAndUpdate("627a2056e4d0048ad86566e7", {
        avartImage: s3Url
    });
    res.send(finderUser);
}));
module.exports = router;
