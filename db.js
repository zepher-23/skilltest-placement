const  mongoose = require('mongoose');

// MongoDB connection URL
const url =
  'mongodb+srv://auth2:erINp3lhkFOjf1g8@cluster0.nmn5cih.mongodb.net/placement?retryWrites=true&w=majority';


// Function to establish mongodb connection
const connectDb = async () => {
    try {
        await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log('connected to mongoDB');

    }
    catch (err) {
        console.error('failed to connect MongoDB:', err);
    }
}

module.exports = { connectDb };