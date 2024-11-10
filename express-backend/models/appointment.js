const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: {type: String, required: true},
  patientAddress: String,
  phoneNumber: String,
  email: String,
  diseaseName: String,
  shortDescription: String,
  appointmentDate: {type: Date, required: true},
  appointmentTime: {type: String, required: true},
  doctorName: String,
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true }
});

module.exports = mongoose.model('Appointment', appointmentSchema);