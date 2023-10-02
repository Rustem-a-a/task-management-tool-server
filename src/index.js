import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from "mongoose";

const app= express();
app.use(express.json());
import 'dotenv/config'
app.use(cors());
const PORT = process.env.PORT || 5000;
const start = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        app.listen(PORT,async ()=> {
            console.log('Server is running in port ' + PORT);
        })
    }
    catch (e){
        console.log(e);
    }
}
start();