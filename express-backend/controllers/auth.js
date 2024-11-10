const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctors.js');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });

exports.register = async (req, res) => {
   try {
      const { username, password, specialty } = req.body;
      
      if (!username || !password || !specialty) {
         return res.status(400).json({ error: 'All fields are required: username, password, specialty, experience, and office hours.' });
      }
      
      const doctor = new Doctor({ username, password, specialty, experience, officeHours });
      await doctor.save();

      res.status(201).json({ message: 'Doctor registered successfully' });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};


exports.login = async (req, res) => {
   try {
      const { username, password } = req.body;
      const doctor = await Doctor.findOne({ username });
      if (!doctor || !(await doctor.comparePassword(password))) {
         return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = generateToken(doctor._id);
      res.json({ token });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

