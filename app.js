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
app.use(express.static(path.join(__dirname, 'frontend')));

//app.use('/api/appointments', appointmentRoutes);
app.use('/appointments', appointmentRoutes);

//Serve 'index.html' file at the root of the server
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
