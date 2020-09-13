const openSocket = require("socket.io-client");
let socket;
module.exports ={
    init:() => {
        socket=openSocket("http://localhost:8000/");
        return socket;
    },
    socket:() => {
        if(!socket){
            throw new Error("Socket not connected");
        }
        return socket;
    }
}