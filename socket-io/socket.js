
const socket = require("socket.io");

const Socket=(server)=>{
      const io = socket(server,{
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"],
          credentials: true
        }
      });
      io.on("connection", function (socket) {
        console.log("Made socket connection",socket.connected);
      });

}

module.exports=Socket