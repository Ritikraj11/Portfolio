const dns = require('dns');

// Force Node.js to use Google DNS for MongoDB SRV lookup
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const crypto = require('crypto');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss');
const hpp = require('hpp');
const Contact = require('./models/contact');

const app = express();
app.disable('x-powered-by');

// --- Security headers (helmet) ---
app.use(
  helmet({
    contentSecurityPolicy: false, // static portfolio; CSP set via Vercel/vercel.json instead
    hsts: { maxAge: 15552000, includeSubDomains: true, preload: true },
    frameguard: { action: 'deny' },
    noSniff: true,
    xssFilter: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
);

// --- CORS Configuration ---
const allowedOrigins = [
  'http://localhost:5173',
  'https://portfolio-9jdyf1n3k-ritikraj11s-projects.vercel.app',
  'https://portfolio-oksl.onrender.com',
  'https://portfolio-h6a2.onrender.com',
  /\.vercel\.app$/,
  /\.onrender\.com$/,
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.some((allowed) =>
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
  optionsSuccessStatus: 204,
  maxAge: 86400,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight

// --- Request logging (sanitized, no bodies) ---
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  console.log(`🛰️ ${req.method} ${req.path} — Origin: ${req.headers.origin || 'none'}`);
  next();
});

// --- Body parsing with strict limits ---
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// --- Injection & XSS defenses ---
app.use(mongoSanitize({ replaceWith: '_' }));
app.use(xss());
app.use(hpp());

// --- Rate limiting ---
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
  skipSuccessfulRequests: true,
});
const healthLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

// --- Input validation helpers ---
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LEN = 1000;

function validateContact(body) {
  const errors = [];
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
    errors.push('name is required');
  } else if (body.name.trim().length > 200) {
    errors.push('name must be 200 characters or fewer');
  }
  if (!body.email || typeof body.email !== 'string' || !emailRegex.test(body.email.trim())) {
    errors.push('a valid email is required');
  } else if (body.email.length > 254) {
    errors.push('email is too long');
  }
  if (!body.message || typeof body.message !== 'string' || body.message.trim().length === 0) {
    errors.push('message is required');
  } else if (body.message.length > MAX_FIELD_LEN) {
    errors.push(`message must be ${MAX_FIELD_LEN} characters or fewer`);
  }
  return errors;
}

// --- MongoDB connection ---
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in environment');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 1,
  maxIdleTimeMS: 30000,
})
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log('📁 Database:', mongoose.connection.name);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// --- Routes ---
app.get('/health', healthLimiter, (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const errors = validateContact({ name, email, message });
    if (errors.length) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    const newContact = new Contact({
      name: String(name).trim().slice(0, 200),
      email: String(email).trim().toLowerCase().slice(0, 254),
      message: String(message).trim().slice(0, MAX_FIELD_LEN),
    });

    await newContact.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('❌ Error processing contact form:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- 404 handler ---
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// --- Error middleware (last resort) ---
app.use((err, req, res, next) => {
  console.error('❌ Global error handler:', err.stack);
  res.status(err.status || 500).json({ error: 'Something went wrong!' });
});

// --- Start server ---
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('✅ Allowed origins:', allowedOrigins);
});

// --- Graceful shutdown ---
process.on('SIGTERM', () => {
  console.log('🔌 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('👋 Server closed');
    process.exit(0);
  });
});