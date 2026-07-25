// ======================================================
// DNS CONFIGURATION
// ======================================================

const dns = require('dns');

// Force Node.js to use Google DNS for MongoDB SRV lookup
dns.setServers(['8.8.8.8', '8.8.4.4']);


// ======================================================
// ENVIRONMENT VARIABLES
// ======================================================

require('dotenv').config();


// ======================================================
// IMPORTS
// ======================================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const Contact = require('./models/contact');


// ======================================================
// APP INITIALIZATION
// ======================================================

const app = express();


// ======================================================
// SECURITY
// ======================================================

app.use(helmet());


// ======================================================
// BODY PARSERS
// ======================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ======================================================
// CORS CONFIGURATION
// ======================================================

const allowedOrigins = [
  // Local development
  'http://localhost:5173',

  // Your Vercel frontend
  'https://portfolio-9jdyf1n3k-ritikraj11s-projects.vercel.app',

  // Your Render backend
  'https://portfolio-oksl.onrender.com'
];

const corsOptions = {
  origin: function (origin, callback) {

    // Allow requests with no origin
    // Example: Postman, curl, server-to-server requests
    if (!origin) {
      return callback(null, true);
    }

    // Exact URL match
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow any Vercel deployment URL
    if (origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }

    console.log('❌ Blocked Origin:', origin);

    return callback(
      new Error('Not allowed by CORS')
    );
  },

  methods: ['GET', 'POST', 'OPTIONS'],

  allowedHeaders: [
    'Content-Type',
    'Accept'
  ],

  credentials: true,

  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));


// ======================================================
// REQUEST LOGGER
// ======================================================

app.use((req, res, next) => {

  console.log('🛰️ Incoming request');
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Origin:', req.headers.origin);

  next();
});


// ======================================================
// MONGODB CONNECTION
// ======================================================

async function connectDatabase() {

  try {

    if (!process.env.MONGODB_URI) {
      throw new Error(
        'MONGODB_URI is not defined in environment variables'
      );
    }

    await mongoose.connect(
      process.env.MONGODB_URI
    );

    console.log(
      '✅ MongoDB connected successfully'
    );

    console.log(
      '📁 Database:',
      mongoose.connection.name
    );

  } catch (error) {

    console.error(
      '❌ MongoDB connection failed:',
      error.message
    );

    process.exit(1);
  }
}


// ======================================================
// CONTACT API
// ======================================================

app.post('/api/contact', async (req, res) => {

  try {

    const {
      name,
      email,
      message
    } = req.body;

    console.log(
      '📩 Contact form received from:',
      email
    );

    // Validate required fields
    if (!name || !email || !message) {

      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Create contact document
    const newContact = new Contact({
      name,
      email,
      message
    });

    // Save to MongoDB
    const savedContact =
      await newContact.save();

    console.log(
      '✅ Contact saved:',
      savedContact._id
    );

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully'
    });

  } catch (error) {

    console.error(
      '❌ Error processing contact form:',
      error.message
    );

    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});


// ======================================================
// HEALTH CHECK
// ======================================================

app.get('/health', (req, res) => {

  const isDatabaseConnected =
    mongoose.connection.readyState === 1;

  return res.status(
    isDatabaseConnected ? 200 : 503
  ).json({

    status:
      isDatabaseConnected
        ? 'OK'
        : 'Database disconnected',

    database:
      mongoose.connection.name || null,

    dbStatus:
      isDatabaseConnected
        ? 'connected'
        : 'disconnected',

    timestamp:
      new Date().toISOString()
  });
});


// ======================================================
// ROOT ROUTE
// ======================================================

app.get('/', (req, res) => {

  res.status(200).json({
    success: true,
    message: 'Portfolio Contact API is running',
    database:
      mongoose.connection.readyState === 1
        ? 'connected'
        : 'disconnected'
  });

});


// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================

app.use((err, req, res, next) => {

  console.error(
    '❌ Global error:',
    err.message
  );

  return res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });

});


// ======================================================
// START SERVER
// ======================================================

const PORT =
  process.env.PORT || 5000;


// ======================================================
// START APPLICATION
// ======================================================

async function startServer() {

  // First connect to MongoDB
  await connectDatabase();

  // Then start Express server
  app.listen(PORT, () => {

    console.log(
      `🚀 Server running on port ${PORT}`
    );

    console.log(
      `🌍 Environment: ${
        process.env.NODE_ENV || 'development'
      }`
    );

    console.log(
      `🔗 Health URL: /health`
    );

  });

}

startServer();


// ======================================================
// GRACEFUL SHUTDOWN
// ======================================================

process.on('SIGTERM', async () => {

  console.log(
    '🔌 SIGTERM received. Shutting down...'
  );

  await mongoose.connection.close();

  console.log(
    '👋 MongoDB connection closed'
  );

  process.exit(0);

});