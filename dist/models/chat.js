"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const chatSchema = new Schema({
    chats: {
        type: String,
        required: true
    },
    users: Array,
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("chats", chatSchema);
