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

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

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

app.listen(process.env.PORT, () => {
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