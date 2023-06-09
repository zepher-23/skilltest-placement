const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const Student = require('../Models/student')

const getList = async (req, res) => {

    const list = await Student.find();

   
        res.render('student',{list})
    

 
       
}

const addStudent =async (req, res) => {
    const { name, college, batch, status, dsa, webd, react } = req.body
    const student =await new Student({
        name,college,batch,status,dsa,webd,react
    })

    student.save().then(() => {
        console.log('Student added')


         res.redirect('/studentlist')
    }).catch((err) => {
        console.log(err)
    })


    
}

module.exports = {getList,addStudent}