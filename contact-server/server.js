const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const Contact = require('./models/contact');

const app = express();

// Whitelisted frontend domains (local + Vercel)
const allowedOrigins = [
  'http://localhost:5173',
  'https://portfolio-9jdyf1n3k-ritikraj11s-projects.vercel.app',
];

// Logging incoming origin
app.use((req, res, next) => {
  console.log('🌐 Incoming Origin:', req.headers.origin || 'undefined');
  next();
});

// CORS setup
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // SSR or direct request
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// POST route to store contact
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  console.log('📩 Form received:', req.body);

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const contact = new Contact({ name, email, message });
    await contact.save();
    console.log('✅ Saved to DB');
    res.status(200).json({ message: 'Message received' });
  } catch (err) {
    console.error('❌ Save error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET route to fetch contacts (for admin or testing)
app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error('❌ Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
