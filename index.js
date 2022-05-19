const express = require("express");
const mongoose = require("mongoose")
const authRouter = require("./auth/authRouter")
const { createProxyMiddleware } = require('http-proxy-middleware');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const app = express()
const passport = require("passport")

app.use(express.json())
app.use(cors());
app.options('*', cors());
app.use("/auth",authRouter,   
    createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
}))
app.use(passport.initialize());
app.use(passport.session())

const start = async () =>{
    try{
        await mongoose.connect(`mongodb+srv://gapasil:465D7b56S@cluster0.4rwkw.mongodb.net/Drugs_Cruft?retryWrites=true&w=majority`)
        app.listen(PORT,()=>console.log("server start "))
    } catch(e){
        console.log(e);
    }
}

start() 