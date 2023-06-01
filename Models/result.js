const mongoose = require('mongoose');

const Student = require('./student');
const Interview = require('./interview');

const resultSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    interview: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview' },
    result:{type:String,enum:['pass','fail','on hold','did not attempt']}
})
const Result = mongoose.model('Result', resultSchema);

module.exports = Result;