let mongoose = require('mongoose')

let registerSchema = new mongoose.Schema(
    {
        name:{
            type:String,
        },
        email:{
            type:String
        },
        password:{
            type:String,
        },
        imagePath:{
            type:[],
        }
    }
)

module.exports = mongoose.model('user',registerSchema)