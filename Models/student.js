const mongoose = require('mongoose')
const Interview = require('./interview')

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    interviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Interview'
    }],
    college: { type: String, required: true },
    batch: { type: Number, required: true },
    status: { type: String, enum:['placed','not placed'], required: true , default:'not placed'},
    dsa: { type: Number,default:0 },
    webd: { type: Number,default:0 },
    react:{type:Number,default:0}
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
