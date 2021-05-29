const express=require('express')
const mongoose = require('mongoose')
const app=express()
//create database with server
const mongoURI= "mongodb+srv://salma123:salma@cluster0.kuvwt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&"
mongoose.connect(mongoURI,{ useNewUrlParser: true,useUnifiedTopology: true },(err)=> {
    err ? console.log(err) : console.log('database is connected')
})
//parse the data
app.use(express.json())
app.use('/Persons', require('./routes/Personroutes'))
const port=5000

app.listen( port, (err)=> {
    err ? console.log(err) : console.log('the server is running on port 5000')
})