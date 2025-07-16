const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const Contact = require('./models/contact');
const app = express();

// Enhanced CORS configuration
const allowedOrigins = [
  'http://localhost:5173', // Local development
  /\.vercel\.app$/, // All Vercel deployments
  /\.onrender\.com$/, // Your Render backend
  'https://portfolio-h6a2.vercel.app', // Your main Vercel domain
  'https://portfolio-9jdyf1n3k-ritikraj11s-projects.vercel.app' // Specific deployment
];

// Improved CORS middleware with better logging
app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log('🌐 Incoming Request:', {
    method: req.method,
    path: req.path,
    origin: origin || 'No origin header'
  });
  next();
});

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check against allowed origins
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return origin === allowed;
      } else if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    });

    if (isAllowed) {
      console.log(`✅ Allowed origin: ${origin}`);
      return callback(null, true);
    } else {
      console.log(`❌ Blocked origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

app.use(bodyParser.json());

// Connect to MongoDB with better error handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
};
connectDB();

// POST: Save contact form with enhanced validation
app.post('/api/contact', async (req, res) => {
  try {
    console.log('📩 Request Body:', req.body);
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      console.log('⚠️ Missing fields');
      return res.status(400).json({ 
        error: 'All fields are required',
        received: { name, email, message }
      });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    console.log('✅ Contact saved:', { name, email });
    res.status(201).json({ 
      message: 'Message stored successfully',
      data: { name, email }
    });
  } catch (err) {
    console.error('❌ Server Error:', err);
    res.status(500).json({ 
      error: 'Server error',
      details: err.message 
    });
  }
});

// GET: View all messages with pagination
app.get('/api/contact', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Contact.countDocuments();

    res.json({
      data: contacts,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to fetch contacts',
      details: err.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    dbState: mongoose.connection.readyState,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('🔧 Environment:', process.env.NODE_ENV || 'development');
  console.log('🔄 Allowed Origins:', allowedOrigins);
});