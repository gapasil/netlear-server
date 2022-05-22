const express = require("express");
const mongoose = require("mongoose")
const authRouter = require("./auth/authRouter")
const userRouter = require("./user/userRouter")
const { createProxyMiddleware } = require('http-proxy-middleware');
const PORT = process.env.PORT || 80;
const cors = require('cors');
const app = express()
const passport = require("passport")
const session = require('express-session')
const VKStrategy = require("passport-vkontakte").Strategy
const path = require("path")

app.set('views', './views'); // specify the views directory
app.set('view engine', 'ntl'); // register the template engine 
app.engine('html', require('ejs').renderFile);
app.use(express.json())
app.use(cors());
app.use(express.static(__dirname + '/views'));
app.options('*', cors());
app.use("/auth",authRouter)
app.use("/useroute",userRouter)
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET_KEY_RANDOM" 
}));
app.use(passport.initialize());
app.use(passport.session())

require('./auth/passportstrategy/strategysocial')(app, passport);
require('./auth/passportstrategy/vkstrategy')(passport);

const start = async () =>{
    try{
        await mongoose.connect(`mongodb+srv://gapasil:465D7b56S@cluster0.4rwkw.mongodb.net/Drugs_Cruft?retryWrites=true&w=majority`)
        app.listen(PORT,()=>console.log("server start "))
    } catch(e){
        console.log(e);
    }
}

start() 
