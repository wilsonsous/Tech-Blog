// FUNCTION FOR HANDLING LOGIN BUTTON ON LOGIN PAGE
const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // COLLECT VALUES FROM LOGIN FORM
    const name = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (name && password) {
      // SEND A POST REQUEST TO THE API ENDPOINT TO LOGIN USER
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // IF SUCCESSFUL, REDIRECT THE BROWSER TO THE HOMEPAGE
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    };
  };
  
  // CLICK EVENT LISTENER FOR SUBMIT BUTTON ON LOGIN FORM
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);