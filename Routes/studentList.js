const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const studentController = require('../Controllers/studentController')


router.get('/', studentController.getList)
router.post('/',studentController.addStudent)


module.exports = router;