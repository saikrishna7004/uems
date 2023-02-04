const mongoose = require('mongoose')
require('dotenv').config()

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    name: String
})
const User = mongoose.model('User', UserSchema)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Mongo Connected")
})

User.create({
    username: 'admin',
    password: 'password',   
    email: 'admin@gmail.com',
    name: 'Sai Krishna'
})


User.findOne({
    username: 'admin'
}, (e, data)=>{
    console.log(data, e)
})