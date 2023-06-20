const express = require('express')
const mongoose = require('mongoose')
const User = require('../Models/employee')
const { authenticate } = require('./authenticate')

// Funtion to create new employee
const createUser = (req, res) => {

    const { EmployeeID, password } = req.body

    if (checkUserExists(EmployeeID)) {
        res.render('index', { message: 'User exists ! please sign in' })
    }
    else {
    
        const user = new User({
            employeeID: EmployeeID,
            password: password
        });

        user.save()
            .then(() => {
                console.log('user created')
            })
            .catch((err) => {
                console.error(err);
                // Handle the error
            });
        res.render('index', { message: "User Created !, Sign in" })
    }
}


// Function to handle Employeen login 
const userLogin =async (req, res) => {
   
    const {EmployeeID,password} = req.body;
 
    if (await checkUserExists(EmployeeID)) {
        const user = await User.findOne({ employeeID: EmployeeID })
       
        if (await user.password == password) {

            res.redirect('dashboard')
        }
        else {
            res.render('index',{ message:'Password does not match' } )
        }
    }
    else {

        res.render('index', { message: 'Invalid User !' })
    }
}

// Helper function to check if employee exists
const checkUserExists = async (employeeID) => {
    try {
        const user = await User.findOne({ employeeID })
        //  console.log(await user)
        return user !== null;
    }
    catch (err) {
        console.log('error checking user:', err);
        return false;
    }
}

module.exports = { createUser, userLogin }