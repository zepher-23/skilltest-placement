const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path')
const { connectDb } = require('./db');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const signUp = require('./Routes/signup')
const studentList = require('./Routes/studentList')
const interviewList = require('./Routes/interviewList')



app.set('view engine', 'ejs');
app.use(express.static('public'));


//connect to mongodb [code in db.js]
connectDb();

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

// Middleware for request parsing and other common tasks
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

//Routes

app.get('/', (req, res) => {

    const title = 'Login Page';
    res.render('index',{message:'Sign up / Sign in to proceed'})
    
})

app.use('/signup', signUp); 
app.use('/signin',signUp)

app.get('/dashboard', (req, res) => {
    res.render('dashboard',{})
})

app.use('/studentlist', studentList)
app.use('/addstudent', studentList)
app.use('/interviewlist', interviewList)
app.use('/addinterview',interviewList)



const port = 3000;
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});