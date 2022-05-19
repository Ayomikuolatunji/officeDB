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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
aws_sdk_1.default.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEYID,
    region: 'us-east-1' // region of your bucket
});
const s3 = new aws_sdk_1.default.S3();
const upload = (options) => __awaiter(void 0, void 0, void 0, function* () {
    yield s3
        .putObject({
        Bucket: "officedbfiles",
        Key: options.key,
        Body: Buffer.from(options.data, "base64"),
        ContentType: "image/jpeg",
    })
        .promise()
        .catch(err => {
        console.log(err.message);
    });
    return {
        url: `https://officedbfiles.s3.amazonaws.com/${options.key}`,
        name: options.key,
    };
});
exports.default = upload;
