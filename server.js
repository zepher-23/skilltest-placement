const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path')
const { connectDb } = require('./db');
const mongoose = require('mongoose')


//connect to mongodb [code in db.js]
connectDb();

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

// Middleware for request parsing and other common tasks
app.use(express.json());

//Routes




const port = 3000;
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});