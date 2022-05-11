const mongoose = require('mongoose')


const personalTrainersSchema = mongoose.Schema({

    name:String,
    lastName:String,
    age:Number,
    students : [{ type: mongoose.Schema.Types.ObjectId, ref: 'students' }]
});



const Trainer = mongoose.model('PersonalTrainers',personalTrainersSchema)


module.exports = Trainer