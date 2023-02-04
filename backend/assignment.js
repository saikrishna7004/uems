const mongoose = require('mongoose')
require('dotenv').config()

const HimalayaSchema = new mongoose.Schema({})
const Himalaya = mongoose.model('peak', HimalayaSchema)

let MONGO_URI_MAAM = 'mongodb+srv://student:kmit123@cluster0.mwifk43.mongodb.net/himalayas?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI_MAAM).then(()=>{
    console.log("Mongo Connected")
})

Himalaya.find((e, data)=>{
    console.log(data)
})