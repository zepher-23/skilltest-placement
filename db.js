const  mongoose = require('mongoose');

// MongoDB connection URL
const url = 'mongodb://127.0.0.1:27017/users';


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