const { default: mongoose } = require('mongoose');
const Appointment = require('../models/appointment.js');

exports.createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      new mongoose.Types.ObjectId(req.params.id),
      req.body,
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }    
    res.json(updatedAppointment);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete( new mongoose.Types.ObjectId(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error });
  }
};
