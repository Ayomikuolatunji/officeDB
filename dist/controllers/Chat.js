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
const Chat = require("../models/chat");
const fetchChat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const from = req.body.from;
    const to = req.body.to;
    try {
        const messages = yield Chat.find({ users: { $all: [from, to] } }).sort({ updatedAt: 1 });
        if (!messages) {
            const error = new Error("No similar chats found");
            error.statusCode = 404;
            throw error;
        }
        const sendChat = messages.map(chat => {
            return {
                me: chat.sender.toString() === from,
                message: chat.chats
            };
        });
        res.status(200).json({ sendChat });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
const postChat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = req.body.chat;
        const from = req.body.from;
        const to = req.body.to;
        const chatsCreated = yield Chat.create({
            chats: message,
            users: [from, to],
            sender: from
        });
        if (!chatsCreated) {
            const error = new Error("failed to create message chat");
            error.statusCode = 422;
            throw error;
        }
        res.status(201).json({ message: "succesfully sent", chats: chatsCreated });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
module.exports = { postChat, fetchChat };
