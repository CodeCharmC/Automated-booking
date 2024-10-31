const mongoose = require('mongoose');
const Appointment = require('../models/appointment.js');

exports.createAppointment = async (req, res) => {
  try {
    const requiredFields = ['patientName', 'appointmentDate', 'appointmentTime', 'doctorName'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.appointmentDetails = async (req, res) => {
  try {
    const appointment = await Appointment.findById(
      new mongoose.Types.ObjectId(req.params.id)
    );
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSingleAppointment = async (req, res) => {
  try {
    const singleAppointment = await Appointment.findById( new mongoose.Types.ObjectId(req.params.id));    
    if (!singleAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json(singleAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      new mongoose.Types.ObjectId(req.params.id),
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }    
    res.json({ message: 'Appointment updated successfully', updatedAppointment});
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const deleteAppointment = await Appointment.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id));
    if (!deleteAppointment) {
      return res.status(404).json({ error: 'Appointment not found'})
    }
    res.status(204).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
