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
    status: { type: Boolean, required: true },
    dsa: { type: Number },
    webd: { type: Number },
    react:{type:Number}
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
