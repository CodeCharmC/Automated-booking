async function loadDoctors() {
   const response = await fetch('/doctor');
   const doctors = await response.json();
   const doctorsList = document.getElementById('doctors-list');

   doctors.forEach(doctor => {
   const listItem = document.createElement('li');
   listItem.textContent = `${doctor.name} - ${doctor.specialty}`;
   doctorsList.appendChild(listItem);
   });
}

loadDoctors();
