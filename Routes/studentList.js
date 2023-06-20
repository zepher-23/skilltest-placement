const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const studentController = require('../Controllers/studentController')

// Route for getting student list
router.get('/', studentController.getList)

// Route for adding a student
router.post('/',studentController.addStudent)


module.exports = router;