
const socket = require("socket.io");

const Socket=(server)=>{
      const io = socket(server,{
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"],
          credentials: true
        }
      });
      global.onlineUsers=new Map()
      

      io.on("connection", function (socket) {
        global.chatSocket=socket
        socket.on("add-users",userId=>{
            onlineUsers.set(userId,socket.id)
        })
        socket.on("send-msg",data=>{
            const sendUserSocket=onlineUsers.get(data.to)
            if(sendUserSocket){
                socket.to(sendUserSocket).emit("msg-received",data.message)
            }
        })
        console.log("Made socket connection");
      });

}

module.exports=Socket