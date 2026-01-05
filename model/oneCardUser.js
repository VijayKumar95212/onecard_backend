const mongoose = require("mongoose");


const OneCardSchema = mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    username:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false
    },
    phone:{
        type:String,
        required:false
    },
    otp:{
        type:String,
        required:false
    },
    isLogout:{
        type:Boolean,
        required:false,
        default:false
    },
    avatar:{
        type:String,
        default:"",
        required:false,
    },
    role:{
        type:String,
        default:"user",
        required:false,
    },
});

const OneCard = mongoose.model("OneCard",OneCardSchema);
module.exports = OneCard;
