const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const interviewController = require('../Controllers/interviewController')

// Handles routing for get request for the interview list
router.get('/', interviewController.getList)

// Handles routing for post request to add interview
router.post('/', interviewController.addInterview)

// Handles routing for post request to change status of the interview
router.post('/changestatus',interviewController.changeStatus)



module.exports = router;