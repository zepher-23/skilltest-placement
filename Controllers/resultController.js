const express = require('express')
const Result = require('../Models/result')
const Interview = require('../Models/interview')
const Student = require('../Models/student')
const csv = require('fast-csv')
const fs = require('fs')
const path = require('path')


// Function to View the results of interviews of all students 
const viewResult = async (req, res) => {
    let interviewNames = []
    let studentNames = []
    
    const resultList = await Result.find()
   for (const item of resultList) {
       let getInterviewName = await Interview.findById(item.interview);
       let getStudentName = await Student.findById(item.student)

       interviewNames.push(getInterviewName.companyName);
       studentNames.push(getStudentName.name)
        
    }
    
    


    
    res.render('result',{resultList,studentNames,interviewNames})
}



// Function to download the csv file containing interview results
// csv file written using 'fast-csv' library
const download = async (req, res) => {

    const interviews = await Interview.find();
const csvStream = csv.format({headers:true})
const writableStream = fs.createWriteStream('Result_details.csv');
    csvStream.pipe(writableStream);
    // Setting the Column names of the csv file
   csvStream.write(['Student id', 'student name', 'student college', 'student status', 'DSA Final Score', 'WebD Final Score', 'React Final Score', 'interview date', 'interview company', 'interview student result'])

    // for loop to iterate over all the interviews
    for (const item of interviews) {
        const studentList = item.studentId
        
        const date = item.date


        // for loop to iterate over students list present inside the interview object
        for (let i = 0; i < studentList.length; i++){
            const StudentDetails = await Student.findById(studentList[i])
            const studentResult = await Result.findOne({ $and: [{ interview: item.id }, { student: StudentDetails.id }] })

            // Student ID generated using the object id of the model
            const studentId = StudentDetails.id[0] + StudentDetails.id[1] + StudentDetails.id[(StudentDetails.id).length-2] + StudentDetails.id[(StudentDetails.id).length-1]
            csvStream.write([
                studentId,
                StudentDetails.name,
                 StudentDetails.college,
                StudentDetails.batch,
                 StudentDetails.status,
               StudentDetails.dsa,
             StudentDetails.webd,
                StudentDetails.react,
                date[i],
                item.companyName,
                 studentResult.result                
            ]
            )




        }
    }
    csvStream.end();
    writableStream.end();

    // Setting necessary header to send the downloadable file
     res.setHeader('Content-Disposition', 'attachment; filename=Result_details.csv');
  res.setHeader('Content-Type', 'text/csv');
    res.download('Result_details.csv');    

}




module.exports = {viewResult, download}