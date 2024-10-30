const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.js');
const authMiddleware = require('../middlewares/auth.js');

//for patients
router.post('/', appointmentController.createAppointment);
router.get('/:id/details', appointmentController.appointmentDetails);      //need to be fixed

//for doctor
router.get('/', authMiddleware, appointmentController.getAppointments);
router.get('/:id', authMiddleware, appointmentController.getSingleAppointment);
router.patch('/:id', authMiddleware, appointmentController.updateAppointment);
router.delete('/:id', authMiddleware, appointmentController.deleteAppointment);

module.exports = router;
