const jwt = require("jsonwebtoken")
const {secretKey} = require("../config")

module.exports = function (req, res, next){
    if(req.method === "options"){
        next()
    }

    try{
        const token = req.headers.authorization.split(" ")[1]
        if(!token){
            return res.status(403).json({message:"Пользователь не авторизован"})
        }
        const decodetdata = jwt.verify(token, secretKey)
        req.user = decodetdata
        next()
        
    }catch(e){
        console.log(e);
        return res.status(403).json({message:"Пользователь не авторизован"})
    }
}