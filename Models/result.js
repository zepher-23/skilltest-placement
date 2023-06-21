const mongoose = require('mongoose');

const Student = require('./student');
const Interview = require('./interview');

const resultSchema = new mongoose.Schema({
    interview: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview' },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    date: { type: String,required:true },
    result:{type:String,enum:['pass','fail','on hold','did not attempt','no result'],default:'no result'}
})
const Result = mongoose.model('Result', resultSchema);

module.exports = Result;

