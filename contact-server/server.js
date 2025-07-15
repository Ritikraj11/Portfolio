const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const Contact = require('./models/contact');

const app = express();

// Whitelist both localhost and Vercel frontend
const allowedOrigins = [
  'http://localhost:5173',
  'https://portfolio-9jdyf1n3k-ritikraj11s-projects.vercel.app'
];

// Logging middleware
app.use((req, res, next) => {
  console.log('🌐 Incoming Origin:', req.headers.origin || 'undefined');
  next();
});

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('❌ Blocked Origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST']
}));

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Contact API
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log('📥 Received POST:', req.body); // <== ADD THIS

    if (!name || !email || !message) {
      console.log('❌ Missing field(s)');
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = new Contact({ name, email, message });
    const saved = await contact.save();
    console.log('✅ Saved to MongoDB:', saved); // <== ADD THIS

    res.status(200).json({ message: 'Message received' });
  } catch (err) {
    console.error('❌ Error saving message:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// Optional GET endpoint to test
app.get('/', (req, res) => {
  res.send('Portfolio Contact API is working');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
