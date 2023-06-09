const mongoose = require('mongoose')
const Student = require('./student')

const interviewSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    date: [{ type: String,required:true }],
    studentId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }],
    studentName: [{ type: String, ref: 'student', required: true }]
    
})

const Interview = mongoose.model('Interview',interviewSchema)

module.exports = Interview;