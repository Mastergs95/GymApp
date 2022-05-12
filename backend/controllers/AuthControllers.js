const User = require('../models/User')
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')






const register = (req,res, next)=>{

    

    bcrypt.hash(req.body.password,10, async function(err, hashedPass){
        if(err){
            res.json({
                error:'Password is required'
            })
        }
        const{name,email,role}=req.body

        let user = new User({

            name: req.body.name,
            lastName:req.body.lastName,
            email: req.body.email,
            password: hashedPass,
            role: req.body.role,

        })

        if(!name){
            res.status(422).json({error:'Name is required'})
            return
        }

        if(!email){
            res.status(422).json({error:'Email is required'})
            return
        } 
        if(!role){
            res.status(422).json({error:'Role is required'})
            return
        } 


        user.save()

        .then(user=>{

            res.json({
                message:'User added successfully!',
                user
            })
        })
        .catch(error =>{
            res.json({
                message: 'An error occurred!'
            })
        })
    })

}



const login = (req, res, next)=>{
    var email = req.body.email
    var password = req.body.password


    User.findOne({$or: [{email:email},]}).then( user =>{
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name}, 'verySecretValue', {expiresIn:'1h'})
                    res.json({
                        message: "Login successful!",
                        token,
                        name:user.name,
                        id:user._id,
                    })
                }else{
                    res.json({
                        message:'Password does not matched',
                    })
                }
            })
        }else{
            res.json({
                message:'No user found!'
            })
        }
    })
}

module.exports={
    register,
    login
}