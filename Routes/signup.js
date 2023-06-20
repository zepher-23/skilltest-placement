const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController')


 // Handle GET request for Index page
router.get('/', (req, res) => {
 
  res.render('index')
});

// Handle Post request of '/signup' and '/signin' route
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
 