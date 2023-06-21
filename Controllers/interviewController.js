const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const Student = require('../Models/student')
const Interview = require('../Models/interview')
const Result = require('../Models/result')

// Helper function to get names of all students
const getStudentNames = async () => {
    const nameList = Student.find({}, 'name');
    return nameList;
}

// Helper function to get list of interviews
const getInterviewList = async () => {
    const interviewList = Interview.find();
    return interviewList;

}

// Function to get student and interview list and render the page with the data 
const getList = async (req, res) => {
    const studentList = await getStudentNames();
    const interviewList = await getInterviewList();


    res.render('interview',{studentList,interviewList})
    
}

// Function to handle adding new interview and storing in database
const addInterview = async (req, res) => {

    const { company, date, student } = req.body; 
    const studentDetails =decodeURIComponent( req.body.student)
    console.log(req.body)
    const [studentId, studentName] = studentDetails.split('|')

    const newDate = new Date(date);

const day = String(newDate.getDate()).padStart(2, '0');
const month = String(newDate.getMonth() + 1).padStart(2, '0');
const year = String(newDate.getFullYear()).slice(-2);

    const formattedDate = `${day}-${month}-${year}`;
    



    const nameExists = await Interview.findOne({ companyName: company })
    // Checks if interview already exists, if YES, pushes data to the existing interview, else 
    // creates new interview
    if (nameExists) {
        const interview = nameExists;
        interview.date.push(formattedDate);
        interview.studentId.push(studentId);
        interview.studentName.push(studentName);
        interview.save().then(() => {
            console.log('company exists, data added')
            const addResult = new Result({ interview: nameExists.id, student: studentId, date: formattedDate })
            addResult.save().then(() => {
                console.log('Result added')
                res.redirect('/interviewlist');
            }).catch(err => {
                console.log('Error adding Result:', err)
                res.send('Error Creating Result Data')
            })
        }).catch(err => {
            console.log('error pushing data:', err)
            res.send('Error Creating Interview')
        })
    } else {
        const interview = new Interview({ companyName: company, date: formattedDate,studentId,studentName   });
        interview.save()
            .then(savedStudent => {
                console.log('company not exists, Interview saved');
                 const addResult = new Result({ interview: savedStudent.id, student: studentId, date: formattedDate })
            addResult.save().then(() => {
                console.log('Result added')
                res.redirect('/interviewlist');
            }).catch(err => {
                console.log('Error adding Result:', err)
                 res.send('Error Creating Result Data')
            })
            })
            .catch(error => {
                console.error('Error saving student:', error);
                 res.send('Error Creating Interview')
            });
    
    }
   
    
}


// Handles the updation of status of interviews 
const changeStatus = async (req, res) => {
    const {status} = req.body;
    const [result, companyName, date, studentName] = status.split('|')

    console.log(date)

    const student = await Student.findOne({ name: studentName })
    const interview = await Interview.findOne({ companyName })


    const studentId = student.id;
    const interviewId = interview.id;

    const resultExists = await Result.findOne({ $and: [{ interview: interviewId }, { student: studentId },{date:date}] })
    if (resultExists) {
      const updateResult = await Result.findOneAndUpdate({ $and: [{ interview: interviewId }, { student: studentId },{date:date}] },{$set:{result}},{new:true})
        if (updateResult) {
            console.log('result status updated');
        } else { console.log('error updating result status') }
        

    } else {
        const interviewResult = new Result({ interview: interviewId, student: studentId, date, result })
    
        interviewResult.save().then(console.log('interview result saved')).catch(err => { console.log('error:' + err) })
    }
    res.redirect('/interviewlist')

}

module.exports = { getList,addInterview, changeStatus }