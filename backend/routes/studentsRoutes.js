const router = require('express').Router()


const students = require('../models/students')
const PersonalTrainers = require('../models/personalTrainers')
const { db } = require('../models/personalTrainers')


//Create
router.post('/create', async(req,res)=>{


    const student = new students({
        roleName:"Student",
        user:req.body.user

    })


    try{

        await students.create(student)
        res.status(201).json({msg:'Students inserted...'})
        
    }catch(error){
        res.status(500).json({error: error})
    }
})

router.patch('/updateStudentTrainer/:id', async (req, res)=>{

    const id = req.params.id

    
    try{


        const{name, lastName, age, height, weight,personalTrainer}=req.body

        const student={
            name,
            lastName,
            age,
            height,
            weight,
            personalTrainer,
        }


        if(!personalTrainer){
            res.status(422).json({msg: 'Trainer not found!'})
            return
        } 

            const updateStudent = await students.updateOne({_id:id},student)

            if(updateStudent.matchedCount===0){
                res.status(422).json({msg:'Student not found!'})
                return
            }

            res.status(200).json(student)

        }catch(error){
        res.status(500).json({error: error})
    }

})


//READ
router.get('/get', async (req,res)=>{

    try{

        const student = await students.find()
        res.status(200).json(student)

    }catch(error){
        res.status(500).json({error: error})
    }

})

router.get('/get/:id', async (req,res)=>{

    const id = req.params.id

    try{

        const student= await students.findOne({_id:id})

        if(!student){
            res.status(422).json({msg: 'User not found!'})
            return
        }

        res.status(200).json(student)

    }catch(error){
        res.status(500).json({error: error})
    }

})


//UPDATE
router.patch('/update/:id', async (req,res)=>{

    const id = req.params.id

    const{name, lastName, age, height, weight,personalTrainer}=req.body

    const student={
        name,
        lastName,
        age,
        height,
        weight,
        personalTrainer,
    }

    try{


         const updateStudent = await students.updateOne({_id:id},student)

        
        

        if(updateStudent.matchedCount===0){
            res.status(422).json({msg:'User not found!'})
            return
        }

        res.status(200).json(student)

    }catch(error){
        res.status(500).json({error:error})
    }

})



//DELETE
router.delete('/del/:id', async (req,res)=>{

    const id = req.params.id

    const student= await students.findOne({_id:id})

    if(!student){
        res.status(422).json({msg: 'User not found!'})
        return
    }

    try{

        await students.deleteOne({_id:id})

        res.status(200).json({msg:'User removed successfully!'})

    }catch(error){
        res.status(500).json({error: error})
    }
})

module.exports=router