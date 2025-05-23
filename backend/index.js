import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectdb from "./utils/db.js";
import userRoute from "./routes/user_route.js"
import postRoute from "./routes/post_route.js"
import messageRoute from "./routes/message_route.js"
import { app,server } from "./socket/socket.js";
import path, { dirname } from 'path'

dotenv.config({})

const PORT=process.env.PORT;
const __dirname=path.resolve(); 
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));



app.use(express.static(path.join(__dirname,"/frontend/dist")))



app.get('/',(req,res)=>{
    return res.status(200).json({
        message:"I am from backend",
        success:true
    })
})

const corsOptions={
    origin:['http://localhost:5173','http://localhost:8000'],
    credentials:true
}
app.use(cors(corsOptions));

app.use("/api/v1/user",userRoute);
app.use("/api/v1/post",postRoute);
app.use("/api/v1/message",messageRoute);

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
})
server.listen(PORT,()=>{
    connectdb();
    console.log(`server listened at port ${PORT}`)
})

