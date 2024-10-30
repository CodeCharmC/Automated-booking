const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.js');
const authMiddleware = require('../middlewares/auth.js');

//for patients
router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getSingleDoctor);

//for doctors
router.get('/profile/:id', authMiddleware, doctorController.doctorProfile);
router.patch('/profile/:id', authMiddleware, doctorController.updateDoctorProfile);
router.delete('/profile/:id', authMiddleware, doctorController.deleteDoctorAccount);

module.exports = router;
