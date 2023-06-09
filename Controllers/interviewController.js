const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const Student = require('../Models/student')
const Interview = require('../Models/interview')

const getStudentNames = async () => {
    const nameList = Student.find({}, 'name');
    return nameList;
}

const getInterviewList = async () => {
    const interviewList = Interview.find();
    return interviewList;

}

const getList = async (req, res) => {
    const studentList = await getStudentNames();
    const interviewList = await getInterviewList();


    res.render('interview',{studentList,InterviewList})
    
}

const addInterview = async (req, res) => {

    const { company, date, student } = req.body; 
    const studentDetails = req.body.student
    const [studentId, studentName] = studentDetails.split('|')

    const newDate = new Date(date);

const day = String(newDate.getDate()).padStart(2, '0');
const month = String(newDate.getMonth() + 1).padStart(2, '0');
const year = String(newDate.getFullYear()).slice(-2);

    const formattedDate = `${day}-${month}-${year}`;
    

    const nameExists = await Interview.findOne({ companyName: company })
    
    if (nameExists) {
        const interview = nameExists;
        interview.date.push(formattedDate);
        interview.studentId.push(studentId);
        interview.studentName.push(studentName);
        interview.save().then(() => {
            console.log('company exists, data added')
        }).catch(err => {
            console.log('error pushing data:',err)
        })
    } else {
       
    
        const interview = new Interview({ companyName: company, date: formattedDate,studentId,studentName   });
        interview.save()
            .then(savedStudent => {
                console.log('company not exists, Interview saved');
            })
            .catch(error => {
                console.error('Error saving student:', error);
            });
    
    }
    const interviewList = await getInterviewList();
    const studentList = await getStudentNames();
    res.render('interview',{studentList,interviewList})
}

module.exports = {getList,addInterview}