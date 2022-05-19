"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Chat_1 = require("../controllers/Chat");
const router = (0, express_1.Router)();
router
    .post("/fetch-chats", Chat_1.fetchChat)
    .post("/chats", Chat_1.postChat);
// .delete("/chats/:")
exports.default = router;
