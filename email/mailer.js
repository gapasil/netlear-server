const nodemailer = require('nodemailer')
const htmlMessageAuthorization = require("./message/verifyregistration")

module.exports = async function(emailCandidate,user,token){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 587, false for other ports
        requireTLS: true,
        auth: {
          user: "gapasilka@gmail.com",
          pass: "465D7b56S",
        },
    })
    
    let result = await transporter.sendMail({
        from: 'netlear',
        to: emailCandidate,
        subject: 'Message from Node js',
        text: 'This message was sent from Node js server.',
        html:
          htmlMessageAuthorization("http://netlear-server.site",user,token),
      })
      
    console.log(result)
}