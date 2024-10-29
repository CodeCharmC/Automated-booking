document.getElementById('appointmentForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
  };

  try {
    const response = await fetch('/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      alert('Appointment booked successfully!');
    } else {
      alert('Failed to book appointment.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error booking appointment.');
  }
});
