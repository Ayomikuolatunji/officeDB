
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
        console.log("Made socket connection",socket.id);
        socket.on("send_chat",data=>{
          console.log(data)
           socket.broadcast.emit("recieved_chat",data)
        })
      });

}

module.exports=Socket