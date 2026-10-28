const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
      maxlength: [200, 'name must be 200 characters or fewer'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      trim: true,
      lowercase: true,
      maxlength: [254, 'email must be 254 characters or fewer'],
      validate: {
        validator: (v) => emailRegex.test(v),
        message: 'a valid email address is required',
      },
    },
    message: {
      type: String,
      required: [true, 'message is required'],
      trim: true,
      maxlength: [1000, 'message must be 1000 characters or fewer'],
    },
  },
  { timestamps: true }
);

// Index for efficient querying of recent messages
contactSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Contact', contactSchema);