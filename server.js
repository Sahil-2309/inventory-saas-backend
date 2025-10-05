require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 8081

// Parse JSON bodies
app.use(express.json())

// Allow Cross-Origin requests from React frontend
app.use(
  cors({
    origin: 'http://localhost:3000', // change if your frontend is served elsewhere
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch((err) => console.error('Connection error:', err))

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Backend is running and connected to MongoDB!')
})

// API routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/companies', require('./routes/companyRoutes'))
// app.use('/api/products', require('./routes/productRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
