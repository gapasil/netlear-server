const Router = require("express")
const controller = require("./authController")
const {check} = require("express-validator")
const roleMidlewaer = require("../midlevaer/rolemidlevaer")
const uploadAvatar = require("../uploads/uploadavatar")
const passport = require("passport")
const VKStrategy = require("passport-vkontakte").Strategy
const request = require('request')

const router = new Router()

router.post("/registeremail",[
    check("email","Неккоректно введен email").isEmail(),
    check("name","Имя пользователя не может быть пустым").notEmpty(),
    check("lastname","Имя пользователя не может быть пустым").notEmpty(),
    check("password","Пароль должен быть больше 5 и короче 15 символов").isLength({min:5,max:15}),
    check("phoneNumber","Недеиствительный номер телефона").isMobilePhone()
],controller.registeremail);
router.post("/registerphone",[
    check("name","Имя пользователя не может быть пустым").notEmpty(),
    check("lastname","Имя пользователя не может быть пустым").notEmpty(),
    check("password","Пароль должен быть больше 5 и короче 15 символов").isLength({min:5,max:15}),
    check("phoneNumber","Недеиствительный номер телефона").isMobilePhone()
],controller.registerphone);
router.post("/uploadavatar",uploadAvatar.single("avatar"), (req,res)=>{
    try{

        if(req.file){
            console.log(req.file)
        }
    } catch (e){
        console.log(e);
    }
})
router.post("/uploadimg",controller.uploadImg)
router.get("/veryfiphone",(req, res) => {
  request.post({
      url:'https://lcab.smsint.ru/json/v1.0/callpassword/send',
      form:JSON.stringify(req.body),
      headers:{
          "X-Token":"6vjxmcgo79pkfsa4z3kp5v8m1ykmq27zbfobyutsmqoec317asnrvwvqcpzt9su2",
          "Content-Type":"application/json"
      }
  },
    (err, response, body) => {
      if (err) return res.status(500).send({ message: err })

      return res.send(body)
    }
  )
})
router.get("/verufyregistration",controller.verufyUser)
router.post("/login",controller.login)
router.get("/users", roleMidlewaer(["admin"]), controller.getUsers)
router.post("/recpass", roleMidlewaer(["user"]), controller.recoweruPass)

module.exports = router 