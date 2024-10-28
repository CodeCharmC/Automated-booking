const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  appointmentDate: Date,
  doctorName: String,
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
