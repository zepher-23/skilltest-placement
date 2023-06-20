const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const employeeSchema = new mongoose.Schema({
    employeeID: {
        type: String,
        required: true
    },
  password: {
      type: String,
      required: true
    },
});

// Hash password before storing in database
employeeSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    } catch (error) {
      return next(error);
    }
  }
  next();
});
 
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
