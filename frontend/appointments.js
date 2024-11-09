document.getElementById('appointment-form').addEventListener('submit', async function (e) {
   e.preventDefault();

   const doctorId = document.getElementById('doctorId').value;
   const patientName = document.getElementById('patientName').value;
   const appointmentDate = document.getElementById('appointmentDate').value;

   const response = await fetch('/appointments', {
   method: 'POST',
   headers: {
      'Content-Type': 'application/json',
   },
   body: JSON.stringify({ doctorId, patientName, appointmentDate }),
   });

   if (response.ok) {
   alert('Appointment booked successfully');
   window.location.reload();
   } else {
   alert('Failed to book appointment');
   }
});

// Fetch and display appointments
async function loadAppointments() {
   const response = await fetch('/appointments');
   const appointments = await response.json();
   const appointmentsList = document.getElementById('appointments-list');
   
   appointments.forEach(appointment => {
   const listItem = document.createElement('li');
   listItem.textContent = `Appointment with Doctor ${appointment.doctorId} on ${appointment.appointmentDate}`;
   appointmentsList.appendChild(listItem);
   });
}

loadAppointments();
