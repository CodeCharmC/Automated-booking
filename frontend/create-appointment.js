function getQueryParams(doctorId) {
   const urlParams = new URLSearchParams(window.location.search);
   return urlParams.get(doctorId);
}

async function fetchDoctors() {
   try {
      const response = await fetch('/doctor/');
      if (!response.ok) throw new Error('Network response was not ok');
      const doctors = await response.json();
      const doctorSelect = document.getElementById('doctor');

      doctors.forEach(doctor => {
         const option = document.createElement('option');
         option.value = doctor._id;
         option.textContent = `${doctor.username} - ${doctor.specialty}`;

         if (doctor._id === getQueryParams('doctorId')) {
            option.selected = true;
         }

         doctorSelect.appendChild(option);
      });
   } catch (error) {
      console.error("Error fetching doctors:", error);
   }
}

async function submitForm(event) {
   event.preventDefault();
   const feedback = document.getElementById('feedback');
   if (feedback) feedback.textContent = '';  // Clear previous feedback if exists

   // Collect form data
   const formData = {
      patientName: document.getElementById('patient-name').value,
      patientAddress: document.getElementById('patient-address').value,
      phoneNumber: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      doctorId: document.getElementById('doctor').value,
      appointmentDate: document.getElementById('date').value,
      appointmentTime: document.getElementById('time').value,
      diseaseName: document.getElementById('disease').value,
      shortDescription: document.getElementById('short-description').value,
   };

   try {
      const response = await fetch('/appointments/', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData)
      });

      if (response.ok) {
         if (feedback) {
            feedback.textContent = 'Appointment successfully created!';
            feedback.classList.add('success');
         }
         document.getElementById('appointment-form').reset();
      } else {
         const errorData = await response.json();
         if (feedback) {
            feedback.textContent = `Error: ${errorData.message}`;
            feedback.classList.add('error');
         }
      }
   } catch (error) {
      if (feedback) {
         feedback.textContent = 'Error: Could not submit appointment.';
         feedback.classList.add('error');
      }
   }
}

window.onload = () => {
   fetchDoctors();
   document.getElementById('appointment-form').addEventListener('submit', submitForm);
};
