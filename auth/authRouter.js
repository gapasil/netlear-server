const Router = require("express")
const controller = require("./authController")
const {check} = require("express-validator")
const roleMidlewaer = require("../midlevaer/rolemidlevaer")
const uploadFile = require("../uploads/uploadimg")
const passport = require("passport")
const VKStrategy = require("passport-vkontakte").Strategy


const router = new Router()

router.post("/register",[
    check("email","Неккоректно введен email").isEmail(),
    check("name","Имя пользователя не может быть пустым").notEmpty(),
    check("lastname","Имя пользователя не может быть пустым").notEmpty(),
    check("password","Пароль должен быть больше 5 и короче 15 символов").isLength({min:5,max:15})
],controller.register);
router.post("/uploadimg",uploadFile.single("avatar"), (req,res)=>{
    try{
        if(req.file){
            console.log(req.file)
        }
    } catch (e){
        console.log(e);
    }
})
router.post("/verufyregistration",controller.verufyUser)
router.post("/login",controller.login)
router.get("/users", roleMidlewaer(["admin"]), controller.getUsers)
router.post("/recpass", roleMidlewaer(["user"]), controller.recoweruPass)
router.get("/auth/vkontakte", passport.authenticate("vkontakte", { display: "mobile" }));
router.get(
    "/auth/vkontakte",
    passport.authenticate("vkontakte", {
        successRedirect: "/",
        failureRedirect: "/login",
    })
);

passport.use(
    new VKStrategy(
        {
            clientID: 8170835, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
            clientSecret: "JkrB4lPjTja4h6NeJeyJ",
            callbackURL: "http://localhost:5000/auth/vkontakte/callback",
        },
        function myVerifyCallbackFn(
            accessToken,
            refreshToken,
            params,
            profile,
            done
        ) {
            // Now that we have user's `profile` as seen by VK, we can
            // use it to find corresponding database records on our side.
            // Also we have user's `params` that contains email address (if set in
            // scope), token lifetime, etc.
            // Here, we have a hypothetical `User` class which does what it says.
            User.findOrCreate({ vkontakteId: profile.id })
            .then(function (user) {
                done(null, user);
            })
            .catch(done);
        }
    )
);

// User session support for our hypothetical `user` objects.
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(function (user) {
            done(null, user);
        })
        .catch(done);
})

module.exports = router 