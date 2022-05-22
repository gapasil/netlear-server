const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;


module.exports = passport => {

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj.id);
    });

    //============ GOOGLE
 ////   passport.use('google', new GoogleStrategy({
 //           clientID: Config.oauth.googleAuth.clientID,
 ///           clientSecret: Config.oauth.googleAuth.clientSecret,
 ///           callbackURL: Config.oauth.googleAuth.callbackURL
  //      },
  ///      function(request, accessToken, refreshToken, profile, done) {
  ///      }));
      //============ LINKEDIN
    passport.use('linkedin', new LinkedInStrategy({
      clientID: "78jnf0pofzkarv",
      clientSecret: "OjOjxr3HfwAWnOSy",
      callbackURL: "http://netlear-server.site/auth/linkedin/callback/signin-linkedin",
      scope: ['r_emailaddress', 'r_liteprofile'],
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile)
    }));
  

    //============ FACEBOOK
    passport.use('facebook', new FacebookStrategy({
      clientID: 529248088586511,
      clientSecret: "407ec19574c089a6510fdd56bc1fe13b",
      callbackURL: "http://netlear-server.site/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'name', 'gender', "emails", 'photos']
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile)
    }));

    //============ VK
    passport.use('vkontakte', new VKontakteStrategy({
            clientID: 8170835,
            clientSecret: "JkrB4lPjTja4h6NeJeyJ",
            callbackURL: "http://netlear-server.site/auth/vkontakte/callback",
        },
        function(accessToken, refreshToken, params, profile, done) {
            console.log(profile)
        }
    ))
}