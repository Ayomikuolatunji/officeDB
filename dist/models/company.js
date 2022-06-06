"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const companySchema = new Schema({
    company_name: {
        type: String,
        required: true
    },
    company_location: {
        type: String,
        required: true
    },
    company_profile_picture: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJF7LAdiF7JlRs24nLsBKz7nWamkcdXPODQ&usqp=CAU",
        required: true
    },
    company_type: {
        type: {
            type: String,
            require: true
        }
    },
    token: {
        type: String,
        default: ""
    },
    company_email: {
        type: String,
        required: true
    },
    company_password: {
        type: String,
        required: true
    },
    company_employes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Users"
        }
    ]
}, { timestamps: true });
exports.default = mongoose_1.default.model("Companies", companySchema);
