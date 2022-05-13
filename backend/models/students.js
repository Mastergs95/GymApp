const mongoose = require('mongoose')

const studentsSchema = mongoose.Schema({
    name:String,
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
});

const Student = mongoose.model('Students',studentsSchema)

module.exports = Student