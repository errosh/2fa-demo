const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,     
    },
    password:{
        type:String,
        required:true,
    },
    auth_secret:{
        type:Object,
    },
},{ timestamp:true})

module.exports = Customer = mongoose.model('user',userSchema)