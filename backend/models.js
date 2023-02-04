const mongoose = require('mongoose')
require('dotenv').config()

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [1, 2, 3], //Super Admin, Organiser and Club Head
        required: true
    }
})
const User = mongoose.model('User', UserSchema)

const EventSchema = new mongoose.Schema({
    title: String,
    type: {
        type: String,
        enum: [1, 2, 3, 4]
    },
    desc: String,
    datetime: Date,
    venue: {
        type: String,
        enum: [1, 2, 3, 4]
    },
    crowd: Number,
    items: [[ String, Number]],
    notes: String,
    status: {
        type: String,
        enum: [1, 2, 3], //Pending, Approved and Declined,
        default: 1
    }
}, {
    timestamps: true
})
const Event = mongoose.model('Event', EventSchema)

module.exports = { User, Event }