const mongoose = require('mongoose')

// Define the structure of company documents
const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // No duplicate company names
    },
    address: {
      type: String,
    },
    logoUrl: {
      type: String, // Store company logo as a URL
    },
    industry: {
      type: String,
    },
  },
  { timestamps: true }
) // Adds createdAt & updatedAt automatically

module.exports = mongoose.model('Company', CompanySchema)
