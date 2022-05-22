const Router = require("express")
const userController = require("./userController")
const {check} = require("express-validator")
const roleMidlewaer = require("../midlevaer/rolemidlevaer")



const router = new Router()

router.get("/user", roleMidlewaer(["user"]), userController.getUser)
router.get("/sosnihuica", userController.sosni)

module.exports = router 