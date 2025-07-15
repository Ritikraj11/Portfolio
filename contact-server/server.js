const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// ✅ MongoDB Model
const Contact = mongoose.model('Contact', new mongoose.Schema({
  name: String,
  email: String,
  message: String
}, { timestamps: true }));

// ✅ Allowed CORS Origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://portfolio-9jdyf1n3k-ritikraj11s-projects.vercel.app'
];

app.use((req, res, next) => {
  console.log('🌐 Incoming Origin:', req.headers.origin);
  next();
});

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(bodyParser.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ POST Route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log('📥 Received POST:', { name, email, message });

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = new Contact({ name, email, message });
    await contact.save(); // ✅ Save to MongoDB

    console.log('✅ Saved to MongoDB:', contact);
    res.status(200).json({ message: 'Message received' });

  } catch (err) {
    console.error('❌ Save failed:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
