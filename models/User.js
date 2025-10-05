const mongoose = require('mongoose')

// Define the structure of user documents
// typically stored in MongoDB
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Each username must be different
    },
    email: {
      type: String,
      required: true,
      unique: true, // Each email must be different
    },
    passwordHash: {
      type: String,
      required: true, // We don't store plain passwords
    },
    company_id: {
      type: mongoose.Schema.Types.ObjectId, // link user to company (if multi-tenant)
      required: true,
    },
  },
  { timestamps: true }
) // adds createdAt & updatedAt

// This lets Express code create/read users in the db
module.exports = mongoose.model('User', UserSchema)
