import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/mongodb.js"
import userRouter from "./routes/userRoutes.js"
import imageRouter from "./routes/imageRoutes.js"
dotenv.config()
const port=process.env.port || 4000
const app=express()
await connectDB()

app.use(cors())
app.use(express.json())
app.use("/api/user",userRouter)
app.use("/api/image",imageRouter)
app.get('/',(req,res)=>{res.send("api is working")})

app.listen(port,()=>{console.log("app is running on port "+port)})