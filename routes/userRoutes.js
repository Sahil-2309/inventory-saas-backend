const express = require('express')
const router = express.Router()
const { registerUser } = require('../controllers/userController')

// Define the registration route
// POST /api/users/register
router.post('/register', registerUser)

// Export so it can be used in server.js
module.exports = router
