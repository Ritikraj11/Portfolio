const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const Contact = require('./models/contact');

const app = express();

// ✅ Whitelist local and Vercel frontend
const allowedOrigins = [
  'http://localhost:5173',
  'https://portfolio-9jdyf1n3k-ritikraj11s-projects.vercel.app'
];

// ✅ CORS setup to handle undefined origins (e.g. Vercel SSR/proxy)
app.use((req, res, next) => {
  console.log('🌐 Incoming Origin:', req.headers.origin);
  next();
});

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) {
      console.log('⚠️ No origin (likely same-origin or server-side)');
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log('❌ Blocked Origin:', origin);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(bodyParser.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ POST: Save contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log('📩 Contact form received:', { name, email, message }); // ✅ Add this

    if (!name || !email || !message) {
      console.log('❌ Missing fields');
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();
    console.log('✅ Saved to MongoDB');

    res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (err) {
    console.error('❌ Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// ✅ GET: Fetch all contacts
app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    console.error('❌ Error fetching contacts:', err);
    res.status(500).json({ error: 'Failed to fetch contact submissions' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
