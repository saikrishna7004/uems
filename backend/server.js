const express = require('express')
const connectMongo = require('./connectMongo')
const { User, Event } = require('./models')
const bodyParser = require('body-parser')
const cors = require('cors');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

connectMongo.connect()

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', async (req, res)=>{
    try {
        let user = await User.find({})
        return res.status(200).json({user})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'})
    }
})

app.post('/new', async (req, res)=>{
    try {
        let user1 = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        if(!user1) return res.status(401).json({ message: 'Unauthorised' });
        let salt = await bcryptjs.genSalt(10)
        let passwordEncrypted = await bcryptjs.hash(req.body.password, salt)
        let user = await User({...req.body, password: passwordEncrypted})
        await user.save()
        return res.status(200).json({message: 'User created successfully', user})
    } catch (error) {
        console.log(error.message)
        let keyRepeated = 'Field'
        if(error.keyValue){
            if(error.keyValue.username) keyRepeated = 'Username'
            else if(error.keyValue.email) keyRepeated = 'Email'
            console.log(keyRepeated)
            if(error.code==11000) return res.status(403).json({message: keyRepeated + ' already exists'})
        }
        if(error.message=='jwt must be provided') return res.status(401).json({message: 'Unauthorised'})
        return res.status(500).json({message: 'Internal server error'})
    }
})

app.post('/api/login', async (req, res) => {
    console.log(req.body);
    if (req.method !== 'POST') {
        return res.status(402).json({ message: 'Invalid Method' });
    }
    try {
        console.log(req.body)
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if(!user){
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        let passwordEncrypted = await bcryptjs.compare(password, user.password)
        console.log(passwordEncrypted)
        if (!passwordEncrypted) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token, role: user.role });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/api/verify', async (req, res) => {
    console.log(req.body);
    if (req.method !== 'POST') {
        return res.status(402).json({ message: 'Invalid Method' });
    }
    try {
        const { token } = req.body;
        let v = jwt.verify(token, process.env.JWT_SECRET)
        let user = await User.findOne({ _id: v.userId })
        console.log(user)
        if (user._id)
            res.status(200).json({ message: "User validated successfully!", success: true, user: {username: user.username, name: user.name, email: user.email, role: user.role} });
        else
            res.status(401).json({ message: "User invalid!", success: false });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message, success: false });
    }
});

app.get('/api/event', async (req, res) => {
    try {
        let data = await Event.find()
        return res.status(200).json({ data, success: true });    
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message, success: false });
    }
});

app.get('/api/event/requests', async (req, res) => {
    if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorised' });
    try {
        let user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        if(!user) return res.status(401).json({ message: 'Unauthorised' });
        let data = await Event.find({$or:[ {status: 1}, {status: 3}]})
        return res.status(200).json({ data, success: true });    
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message, success: false });
    }
});

app.post('/api/event/requests/status', async (req, res) => {
    console.log(req.body)
    if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorised' });
    try {
        let user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        if(!user) return res.status(401).json({ message: 'Unauthorised' });
        let data = await Event.findOne({_id: req.body.e})
        data.status = req.body.i
        data.save()
        return res.status(200).json({ data, success: true });    
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message, success: false });
    }
});

app.post('/api/event', async (req, res) => {
    if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorised' });
    try {
        let user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        if(!user) return res.status(401).json({ message: 'Unauthorised' });
        let event = await Event(req.body)
        event.save()
        console.log(event)
        return res.status(200).json({ data: event, success: true });    
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message, success: false });
    }
});

app.get('/test', async (req, res)=>{
    console.log(req.headers.authorization)
    try {
        let user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        console.log(user)
        user = await User.findOne({_id: user.userId})
        console.log(user)
        return res.json({message: 'Success', user})
    } catch (error) {
        console.log(error.message)
        return res.json({message: error.message})
    }
})

app.listen(5000)