const jwt = require("jsonwebtoken")
const {secretKey} = require("../config")

module.exports = function (roles){
  return function(req, res, next){
    if(req.method === "options"){
        next()
    }

    try{
        let token = req.headers.authorization.split(" ")[1]
        if(!token){
            return res.status(403).json({message:"Пользователь не авторизован"})
        }
        const {roles: userRoles} = jwt.verify(token, secretKey)
        let hasRole = false

        for(let key of userRoles){
            if(roles.includes(key)){
                hasRole = true
            }
        }
        if(!hasRole){
            return res.status(403).json({message:"Недостаточно прав"})
        }

        next()
        
    }catch(e){
        console.log(e);
        return res.status(403).json({message:"Пользователь не авторизован"})
    }
  }
}