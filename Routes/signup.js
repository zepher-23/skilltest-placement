const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController')

// Define your routes for the '/signup' path
router.get('/', (req, res) => {
  // Handle GET request for '/signup' route
  res.render('index')
});


router.post('/', (req, res) => {
    const actionUrl = req.originalUrl;
    if (actionUrl == '/signup') {
        userController.createUser(req, res);
    }
    else {
        userController.userLogin(req, res);
    }
    });

// Export the router
module.exports = router;
 