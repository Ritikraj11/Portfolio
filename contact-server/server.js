const dns = require('dns');

// Force Node.js to use Google DNS for MongoDB SRV lookup
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const Contact = require('./models/contact');

const app = express();
app.use(helmet());

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://portfolio-9jdyf1n3k-ritikraj11s-projects.vercel.app',
  'https://portfolio-oksl.onrender.com',
  /\.vercel\.app$/,
  /\.onrender\.com$/
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.some(allowed =>
      typeof allowed === 'string' ? origin === allowed : allowed instanceof RegExp && allowed.test(origin)
    )) {
      callback(null, true);
    } else {
      console.log('❌ Blocked Origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  console.log('🛰️ Incoming request:');
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Origin header:', req.headers.origin);
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Body:', req.body);

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log('📁 Database:', mongoose.connection.name);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// ✅ POST /api/contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log('📩 Received contact form data:', req.body);

    if (!name || !email || !message) {
      console.log('❌ Missing fields:', { name, email, message });
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newContact = new Contact({ name, email, message });
    const saved = await newContact.save();
    console.log('✅ Saved to MongoDB:', saved);

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('❌ Error processing contact form:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ GET /health
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// ❌ Error middleware (last resort)
app.use((err, req, res, next) => {
  console.error('❌ Global error handler:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('✅ Allowed origins:', allowedOrigins);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔌 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('👋 Server closed');
    process.exit(0);
  });
});
