const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name:
    {
        type:String,
        required: true
    },
    surname: 
    {
        type:String,
        required: true
    },
    email:{
        type:String
    },
    wiek:{
        type:String
    }

})

const User = mongoose.model('User',UserSchema)

module.exports = User