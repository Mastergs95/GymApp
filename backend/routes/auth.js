const express = require('express')
const router = express.Router()

const AuthController = require('../../backend/controllers/AuthControllers')
const users = require('../models/User')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

router.get('/get', async (req,res)=>{

    try{

        const user= await users.find()
        res.status(200).json(user)

    }catch(error){
        res.status(500).json({error: error})
    }

})

router.get('/get/:email', async (req,res)=>{

    const email = req.params.email

    try{

        const user= await users.findOne({email:email})

        if(!user){
            res.status(422).json({msg: 'User not found!'})
            return
        }

        res.status(200).json(user)

    }catch(error){
        res.status(500).json({error: error})
    }

})



module.exports = router