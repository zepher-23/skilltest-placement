const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const interviewController = require('../Controllers/interviewController')


router.get('/', interviewController.getList)
router.post('/',interviewController.addInterview)


module.exports = router;