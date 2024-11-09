// Registration logic
document.getElementById('register-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  const response = await fetch('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
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
