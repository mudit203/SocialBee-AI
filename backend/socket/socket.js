import express from "express";
import http from "http";
import { Server } from "socket.io";

const app= express();
const server= http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:process.env.URL,
        methods:['GET','POST']
    }
})

const usersocketmap={};

export const getreceiverid=(receiverId)=>{
return usersocketmap[receiverId];
}

io.on('connection',(socket)=>{
    const userId=socket.handshake.query.userId;
    if(userId){
        usersocketmap[userId]=socket.id;
        console.log(`user connected:UserId=${userId},Socketid=${socket.id}`);
    }
    io.emit('getonlineusers',Object.keys(usersocketmap))
    socket.on('disconnect',()=>{
        if(userId){
            console.log(`user connected:UserId=${userId},Socketid=${socket.id}`);
            delete usersocketmap[userId]
        }
        io.emit('getonlineusers',Object.keys(usersocketmap))
    })
});

export {app,server,io};