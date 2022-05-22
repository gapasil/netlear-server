const {Schema, model} = require("mongoose")

const User = new Schema({
    email:{type:String, unique:true, required:true},
    name:{type:String, required:true},
    lastname:{type:String, required:true},
    password:{type:String, required:true},
    roles:[{type: String, ref: "Role"}],
    city:{type:String},
    phoneNumber:{type:String},
    academicDegrees:{type:String},
    position:{type:String},
    picture:{type:String},
    gender:{type:String},
    derictoriesFile:{type:Array}
})

module.exports = model("user",User)
