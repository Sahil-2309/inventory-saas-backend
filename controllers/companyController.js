const Company = require('../models/Company')

// Creates a new company
const createCompany = async (req, res) => {
  console.log('REQ BODY:', req.body) // Debugging line to log request body
  try {
    const { name, address, logoUrl, industry } = req.body
    if (!name) {
      return res.status(400).json({ error: 'Company name is required' })
    }
    const existing = await Company.findOne({ name })
    if (existing) {
      return res.status(400).json({ error: 'Company already exists' })
    }

    const newCompany = new Company({ name, address, logoUrl, industry })
    const saved = await newCompany.save()

    res.status(201).json({
      message: 'Company created successfully',
      company: {
        id: saved._id,
        name: saved.name,
        address: saved.address,
        logoUrl: saved.logoUrl,
        industry: saved.industry,
        createdAt: saved.createdAt,
      },
    })
  } catch (err) {
    console.error('Error creating company:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = { createCompany }
