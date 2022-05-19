const User = require("../models/User")
const Role = require("../models/Role")
const mailer = require("../email/mailer")
const bcrypt = require('bcryptjs');
const {validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const {secretKey} = require("../config")

const generateAcessTocken = (id,roles) =>{
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secretKey, {expiresIn:"24h"})
}

class authController {
    async register(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Ошибка при регистраций", errors})
            }
            const {name,lastname,email, password, avatar} = req.body
            const candidate = await User.findOne({email})
            if(candidate){
                return res.status(400).json({message:"Пользователь с таким email уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "noverufyuser"})
            const user = new User({email,lastname,name, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: "Пользователь зарегистрирован"})

        } catch (e) {
            console.log(e);
            res.status(400).json({message:"Registration error"})    
        }
    }

    async login(req, res){
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({message: "Пользователь с таким именем не найден"})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return res.status(400).json({message: "Введен неверный пароль"})
            }
            const token = generateAcessTocken(user._id, user.roles)
            if(user.roles != "user"||user.roles != "admin"){
                mailer(email,user,token)
                return res.json({message: "Для подтверждения регистраций переидите в почту которую указали при регистраций"})
            }
            return res.json({token})

        } catch (e) {
            console.log(e);
            res.status(400).json({message:"login error"})           
        }
    }
    async verufyUser(req, res){
        try{
            let token = req.query.jwt
            const decodetdata = jwt.verify(token, secretKey)
            if(!decodetdata){return}
            let email = req.query.email
            const userRole = await Role.findOne({value: "user"})
            const user = await User.findOneAndUpdate(
                {"email":email},
                {$set:{
                    roles:[userRole.value]
                }},
                {
                    new:true
                }
            )
            const newtoken = generateAcessTocken(user._id, user.roles)
            return res.json({newtoken})
        }catch (e) {
            console.log(e);
            res.status(400).json({message:"login error"})        
        }
    }
    async recoweruPass(req, res) {
       try{
           const {username , password} = req.body
           const user = await User.findOne({username})
           if(!user){
               return res.status(400).json({message: "Пользователь с таким именем не найден"})
           }
           const hashPassword = bcrypt.hashSync(password, 7);
           const newUser = await User.update(
               {id:user._id},
               {
                   $set: {
                      password:hashPassword
                   }                   
               }
           )
           return res.json({"fdfs":newUser})

       }catch (e) {
           console.log(e);
           res.status(400).json({message:"Возникла ошибка при восстановлений пароля"})
       }
    }

    async getUsers(req, res){
        try {
            const user = await User.find()           
            res.json(user)    
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new authController()