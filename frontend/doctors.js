async function loadDoctors() {
   const response = await fetch('/doctor/');   
   const doctors = await response.json();
   const doctorsList = document.getElementById('doctors-list');

   doctors.forEach(doctor => {
      const doctorHTml = `
      <li>
         <div class="doctor-card">
            <div class="doctor-info">
               <h3>${doctor.username}</h3>
               <p>Specialty: ${doctor.specialty}</p>
               <p>Experience: ${doctor.experience}years</p>
               <p>Office Hours: ${doctor.officeHours}</p>
               <button class="book-appointment"><a href="create-appointment.html?doctorId=${doctor._id}">Book Appointment</a></button>
            </div>
            <div>
               <img src=${doctor.avatar} alt="${doctor.username}">
            </div>
         </div>
      </li>
      `;
      doctorsList.innerHTML += doctorHTml;
   });
}

loadDoctors();
