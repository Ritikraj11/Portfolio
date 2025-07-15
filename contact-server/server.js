const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const Contact = require('./models/contact');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://portfolio-9jdyf1n3k-ritikraj11s-projects.vercel.app'
];

app.use((req, res, next) => {
  console.log('Origin:', req.headers.origin);
  next();
});

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('❌ Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log('📨 Received contact form:', req.body);

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (err) {
    console.error('❌ Error saving contact:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
