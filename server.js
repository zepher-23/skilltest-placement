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
const result = require('./Routes/result')
const authenticate = require('./Controllers/authenticate')
const session = require('express-session')

app.use(session({
 secret: 'your-secret-key', // Specify a secret key for session encryption
  resave: false,
  saveUninitialized: true
}))


// Code for setting render engine and serving static files 
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

//connect to mongodb [code in db.js]
connectDb();

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
app.get('/dashboard',authenticate, (req, res) => {
    res.render('dashboard', {})
    
})
app.use('/studentlist',authenticate, studentList)
app.use('/addstudent',authenticate, studentList)
app.use('/interviewlist',authenticate, interviewList)
app.use('/addinterview',authenticate ,interviewList)
app.use('/interviewlist/changestatus',authenticate,interviewList)
app.use('/resultlist',authenticate, result)
app.use('/resultlist/downloadcsv',authenticate, result)

// Fetch and render available jobs from Adzuna API
app.get('/jobs', async (req, res) => {
    const url ='https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=c637f7a8&app_key=3712b0edd684adfbb39e145f69685641&results_per_page=30&what_or=react%20node'
    fetch(url).then(async data => {
        let jobArr = []
        let jobObj={}
        const jobs = await data.json()
        const jobList = jobs.results
        for (let i = 0; i < jobList.length; i++){
            jobObj = {
                company: jobList[i].company.display_name,
                redirect_url: jobList[i].redirect_url,
                title: jobList[i].title,
                description: jobList[i].description,
                location:jobList[i].location.display_name
            }
            jobArr.push(jobObj)

        
        }
      
        res.render('jobs', {jobArr})
    }).catch(err => {
        console.log("Error viewing Jobs", err);
        res.send('Cannot view Jobs due to internal error, Sorry for the inconvenience!')
    })
    
})
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.sendStatus(500);
    } else {
      res.render('index',{message:'User logged out'});
    }
  });
});

// Server listening on port 3000
const port = 3000;
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});