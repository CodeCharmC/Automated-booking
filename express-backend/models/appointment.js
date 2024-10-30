const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  appointmentDate: Date,
  doctorName: String,
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);

/**
 const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientAddress: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v); // Example pattern for phone number
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\S+@\S+\.\S+/.test(v); // Basic email pattern
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  diseaseName: { type: String, required: true },
  shortDescription: { type: String, maxlength: 250 },
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
    enum: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'] // Example time slots
  },
  doctorName: {
    type: String,
    required: true,
    enum: ['Dr. John Doe', 'Dr. Jane Smith', 'Dr. Alex Brown'] // List of available doctors
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);

 
 */