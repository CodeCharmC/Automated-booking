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
         doctorSelect.appendChild(option);
      });
   } catch (error) {
      console.error("Error fetching doctors:", error);
   }
}
