const router = require('express').Router()

const PersonalTrainers = require('../models/personalTrainers')
const Students = require('../models/students')



//Create
    router.post('/create', async(req,res)=>{


        const Trainer = new PersonalTrainers({
            roleName:"PersonalTrainer",
            user:req.body.user
        })

        

        try{

            await PersonalTrainers.create(Trainer)
            res.status(201).json({msg:'PersonalTrainer inserted...'})
            
        }catch(error){
            res.status(500).json({error: error})
        }
    })

//READ
    router.get('/get', async (req,res)=>{

        try{

            const trainers= await PersonalTrainers.find()
            res.status(200).json(trainers)

        }catch(error){
            res.status(500).json({error: error})
        }

    })

    router.get('/get/:id', async (req,res)=>{

        const id = req.params.id

        try{

            const trainer= await PersonalTrainers.findOne({_id:id})

            if(!trainer){
                res.status(422).json({msg: 'User not found!'})
                return
            }

            res.status(200).json(trainer)

        }catch(error){
            res.status(500).json({error: error})
        }

    })

//UPDATE
    router.patch('/update/:id', async (req,res)=>{

        const id = req.params.id

        const{name, lastName, age, student}=req.body

        const trainer={
            name,
            lastName,
            age,
            
        }

        try{

            const updateTrainer = await PersonalTrainers.updateOne({_id:id},trainer)

            if(updateTrainer.matchedCount===0){
                res.status(422).json({msg:'User not found!'})
                return
            }

            res.status(200).json(trainer)

        }catch(error){
            res.status(500).json({error:error})
        }

    })


//UPDATE
    router.patch('/updateSt/:id', async (req,res)=>{

    const id = req.params.id

    const{students}=req.body

    const personalTrainer={
        students,

    }

    try{


         const updateTrainer = await PersonalTrainers.updateOne({_id:id},{$addToSet:{students}})

        
        

        if(updateTrainer.matchedCount===0){
            res.status(422).json({msg:'User not found!'})
            return
        }

        res.status(200).json(personalTrainer)

    }catch(error){
        res.status(500).json({error:error})
    }

})

//DELETE
    router.delete('/del/:id', async (req,res)=>{

        const id = req.params.id

        const trainer= await PersonalTrainers.findOne({_id:id})

        if(!trainer){
            res.status(422).json({msg: 'User not found!'})
            return
        }

        try{

            await PersonalTrainers.deleteOne({_id:id})

            res.status(200).json({msg:'User removed successfully!'})

        }catch(error){
            res.status(500).json({error: error})
        }
    })



module.exports=router