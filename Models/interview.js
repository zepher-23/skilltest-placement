const mongoose = require('mongoose')
const Student = require('./student')

const interviewSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    date:{type:Date}

    
})

const Interview = mongoose.model('Interview',interviewSchema)

module.exports = Interview;