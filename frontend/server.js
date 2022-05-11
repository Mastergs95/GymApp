const express = require('express')
const mongoose= require('mongoose')
const fs = require('fs')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//Initial route
app.get('/',(req,res)=>{
	
    res.json({msg: "Hello world!"})
})



//API routes
const AuthRoute = require('./routes/auth')



app.use('/api', AuthRoute)



//port delivery

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD


mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.ywypn.mongodb.net/GyManage?retryWrites=true&w=majority`)
.then(()=>{
    console.log("Conected to MongoDB!")
    app.listen(4000)
})
.catch((err)=> console.log(err))
