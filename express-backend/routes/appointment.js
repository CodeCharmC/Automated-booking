const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.js');

router.post('/', appointmentController.createAppointment);
router.get('/', appointmentController.getAppointments);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;
