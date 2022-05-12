const mongoose = require('mongoose')


const personalTrainersSchema = mongoose.Schema({
    user : [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
});



const Trainer = mongoose.model('PersonalTrainers',personalTrainersSchema)


module.exports = Trainer