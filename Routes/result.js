const express = require('express')
const router = express.Router();
const resultController = require('../Controllers/resultController')


// Handles routing for viewring the results of the interviews
router.get('/', resultController.viewResult)

// Handles routing for downloading csv file
router.get('/downloadcsv',resultController.download)



module.exports = router