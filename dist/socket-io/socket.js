"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
const socket_io_1 = __importDefault(require("socket.io"));
const Socket = (server) => {
    const io = socket_io_1.default.Socket(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true
        }
    });
    io.on("connection", function (socket) {
        console.log("Made socket connection", socket.id);
        socket.on("send_chat", (data) => {
            console.log(data);
            socket.broadcast.emit("recieved_chat", data);
        });
    });
};
exports.Socket = Socket;
