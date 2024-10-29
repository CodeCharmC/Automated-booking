const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const appointmentRoutes = require('./express-backend/routes/appointment.js');

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URI, { })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use(express.json());
app.use('/appointments', appointmentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
