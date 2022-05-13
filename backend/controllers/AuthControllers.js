const User = require('../models/User')
const PersonalTrainer = require('../models/personalTrainers')
const Students = require('../models/students')

const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
const http = require('http')

function testget(){
    const data = http.get('http://localhost:3000/api/users/get')
    console.log(data)
    data = JSON.parse(data.body)
    console.log(data.message)
}



const register = (req,res, next)=>{

    User.findOne({$or: [{email:req.body.email},]}).then( user =>{

        if(user){

            return res.status(422).json({message:'user exists'})
            
            
        }else{

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

    });

    
}



const login = (req, res, next)=>{
    var email = req.body.email
    var password = req.body.password
    var role = req.body.role
    var name = req.body.name

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

                    if(role=="Peronaltrainer"){
                        
                        Students.findOne({user:user._id}).then(response=>{
                            if(!response){
                                PersonalTrainer.findOne({user:user._id}).then(response=>{

                                    if(!response){
            
                                        const Trainer = new PersonalTrainer({
                                            name:name,
                                            user:user._id,
            
                                        })
                                        PersonalTrainer.create(Trainer)
                                        
                                    }
                                })
                            }
                        })
                        
                        res.json({
                            message: "Login successful!",
                            token,
                            name:user.name,
                            id:user._id,
                        })
                    }
                    if(role=="Student"){

                        PersonalTrainer.findOne({user:user._id}).then(response=>{

                            if(!response){

                                Students.findOne({user:user._id}).then(response=>{

                                    if(!response){
            
                                        const Student = new Students({
                                            name:name,
                                            user:user._id
            
                                        })
                                        Students.create(Student)
                                        
                                    }
                                })
                            }
                        })
                       

                        res.json({
                            message: "Login successful!",
                            token,
                            name:user.name,
                            id:user._id,
                        })
                    }

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