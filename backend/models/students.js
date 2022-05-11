const mongoose = require('mongoose')

const studentsSchema = mongoose.Schema({

    name:String,
    lastName:String,
    age:Number,
    height:Number,
    weight:Number,
    personalTrainer : [{ type: mongoose.Schema.Types.ObjectId, ref: 'personalTrainers' }]
});

const Student = mongoose.model('Students',studentsSchema)

module.exports = Student