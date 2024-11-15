const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const appointmentRoutes = require('./express-backend/routes/appointment.js');
const authRoutes = require('./express-backend/routes/auth.js');
const doctorRoutes = require('./express-backend/routes/doctor.js');
const path = require('path');

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "https://cdn.skypack.dev",
        "'unsafe-inline'"
      ],
      connectSrc: ["'self'", "blob:"], 
      imgSrc: ["'self'", "blob:", "data:"],
      mediaSrc: ["'self'", "blob:"], 
    }
  })
);
  
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/three', express.static(path.join(__dirname, 'node_modules/three')));

app.use('/appointments', appointmentRoutes);
app.use('/auth', authRoutes);
app.use('/doctor', doctorRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
})

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

const gracefulShutdown = () => {
  console.log("Shutting down gracefully...");
  server.close(async () => {
    console.log("Closed out remaining connections");
    try {
      await mongoose.connection.close(); 
      console.log("MongoDB connection closed");
      process.exit(0);
    } catch (error) {
      console.error("Error during shutdown:", error);
      process.exit(1);
    }
  });
};
process.on('SIGINT', gracefulShutdown); // ctrl-c
process.on('SIGTERM', gracefulShutdown); // kill

/**const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const appointmentRoutes = require('./express-backend/routes/appointment.js');
const authRoutes = require('./express-backend/routes/auth.js');
const doctorRoutes = require('./express-backend/routes/doctor.js');

dotenv.config();
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Set up security headers with Helmet
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "https://cdn.skypack.dev", "'unsafe-inline'"],
      connectSrc: ["'self'", "blob:"],
      imgSrc: ["'self'", "blob:", "data:"],
      mediaSrc: ["'self'", "blob:"],
    }
  })
);

// Configure CORS (for a production environment, replace '*' with specific origin)
const corsOptions = {
  origin: 'http://yourfrontend.com',  // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend'))); // Serve static frontend files

// Static assets and modules
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/three', express.static(path.join(__dirname, 'node_modules/three')));

// Route handlers
app.use('/appointments', appointmentRoutes);
app.use('/auth', authRoutes);
app.use('/doctor', doctorRoutes);

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).send('Internal Server Error');
});

// Start server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

// Graceful shutdown
const gracefulShutdown = () => {
  console.log("Shutting down gracefully...");
  server.close(async () => {
    console.log("Closed out remaining connections");
    try {
      await mongoose.connection.close();
      console.log("MongoDB connection closed");
      process.exit(0);
    } catch (error) {
      console.error("Error during shutdown:", error);
      process.exit(1);
    }
  });
};

process.on('SIGINT', gracefulShutdown); // Handle SIGINT (Ctrl-C)
process.on('SIGTERM', gracefulShutdown); // Handle SIGTERM (kill command)
process.on('SIGQUIT', gracefulShutdown); // Handle SIGQUIT (process manager shutdown)
 */