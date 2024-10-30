const { default: mongoose } = require('mongoose');
const Doctor = require('../models/doctors.js');

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSingleDoctor = async (req, res) => {
  try {
    const singleDoctor = await Doctor.findById( new mongoose.Types.ObjectId(req.params.id));    
    if (!singleDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(singleDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.doctorProfile = async (req, res) => {
  try {
    const profile = await Doctor.findById( new mongoose.Types.ObjectId(req.params.id));    
    if (!profile) {
      return res.status(404).json({ error: 'Does not have an account' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDoctorProfile = async (req, res) => {
  try {
    const updatedProfile = await Doctor.findByIdAndUpdate(
      new mongoose.Types.ObjectId(req.params.id),
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }    
    res.json({ message: 'Profile updated successfully', updatedAppointment});
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDoctorAccount = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id));
    if (!deletedDoctor) {
      return res.status(404).json({ error: 'Doctor account not found' });
    }
    res.status(204).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
