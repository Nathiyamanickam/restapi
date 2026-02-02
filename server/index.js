import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import dotenv from "dotenv"
// import route from './routes/'

const app=express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT=process.env.PORT || 8995;
const MONGOURL=process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(()=>{
 console.log("mongodb connection Success......")
 app.listen(PORT,()=>{
    console.log(`server port listening at ${PORT}.....`)
 })
}).catch((error)=>{
    console.log("Error",error.toString())
})

