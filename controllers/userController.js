const bcrypt = require('bcryptjs')
const User = require('../models/User') // Import your User model

// Register a new user
const registerUser = async (req, res) => {
  try {
    // Extract data from the request body
    const { username, email, password, company_id } = req.body

    // Check if all required fields are provided
    if (!username || !email || !password || !company_id) {
      return res.status(400).json({
        error: 'All fields are required: username, email, password, company_id',
      })
    }

    // Check if user already exists (by email or username)
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    })

    if (existingUser) {
      return res.status(400).json({
        error: 'User with this email or username already exists',
      })
    }

    // Hash the password for security
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Create a new user document
    const newUser = new User({
      username,
      email,
      passwordHash,
      company_id,
    })

    // Save the user to MongoDB
    const savedUser = await newUser.save()

    // Return success response (without password)
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        company_id: savedUser.company_id,
        createdAt: savedUser.createdAt,
      },
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Export the function so routes can use it
module.exports = {
  registerUser,
}
