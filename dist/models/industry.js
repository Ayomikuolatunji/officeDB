"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const industrySchema = Schema({
    name: {
        type: String,
        required: true
    }
});
exports.default = mongoose.model("All_Industries", industrySchema);
