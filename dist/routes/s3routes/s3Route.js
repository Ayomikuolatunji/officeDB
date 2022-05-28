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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const uploadSetUp_1 = __importDefault(require("../../aws/uploadSetUp"));
const employee_1 = __importDefault(require("../../models/employee"));
router.post("/upload", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body.data;
    const key = req.body.key;
    const url = "627a2056e4d0048ad86566e7";
    yield (0, uploadSetUp_1.default)({
        Bucket: "officedbfiles",
        key: key,
        data: data,
        ContentType: "image/jpeg"
    });
    const s3Url = `https://${'college-sigunp-image'}.s3.amazonaws.com/${key}`;
    const finderUser = yield employee_1.default.findOneAndUpdate(url, {
        avartImage: s3Url
    });
    res.send(finderUser);
}));
exports.default = router;
