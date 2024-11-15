// Registration logic
document.getElementById('register-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append('username', document.getElementById('register-username').value);
  formData.append('email', document.getElementById('register-email').value);
  formData.append('password', document.getElementById('register-password').value);
  formData.append('specialty', document.getElementById('register-specialty').value);
  formData.append('experience', document.getElementById('register-experience').value);
  formData.append('officeHours', document.getElementById('register-office-hours').value);

  // Get avatar file (if exists) and append to form data
  const avatarInput = document.getElementById('register-avatar');
  if (avatarInput.files[0]) {
    formData.append('avatar', avatarInput.files[0]);
  }

  // Send data to server
  const response = await fetch('/auth/register', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    alert('Registration successful');
    window.location.href = 'login.html';
  } else {
    alert('Failed to register');
  }
});


// Login logic
document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
    alert('Login successful');
    window.location.href = 'appointments.html';
  } else {
    alert('Failed to log in');
  }
});
