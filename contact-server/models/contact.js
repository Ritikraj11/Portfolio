const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
}, {
  timestamps: true // ✅ this adds createdAt and updatedAt
});

module.exports = mongoose.model('Contact', contactSchema);
