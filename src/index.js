import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'
import authRouter from "./router/authRouter.js";
import projectRouter from "./router/projectRouter.js";
import taskRouter from "./router/taskRouter.js";
import columnRouter from "./router/columnRouter.js";
import errorMiddleware from "./middlewares/ErrorMiddleware.js";
import commentRouter from "./router/commentRouter.js";
const PORT = process.env.PORT || 5000;
const app= express();


app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        credentials:true,
        origin: process.env.CLIENT_URL
    }
));
app.use('/project',projectRouter);
app.use('/task',taskRouter);
app.use('/comment',commentRouter);
app.use('/column',columnRouter);
app.use('/auth',authRouter);

app.use(errorMiddleware);
const start = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        app.listen(PORT,async ()=> {
            console.log('Server is running in port ' + PORT);
        })
    }
    catch (e){
        console.log(e);
    }
}
start();