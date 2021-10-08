// FUNCTION FOR HANDLING SIGNUP BUTTON ON SIGNUP PAGE
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    // COLLECT VALUES FOR USER INFO FROM SIGNUP FORM
    const name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {
      // SEND A POST REQUEST TO THE API ENDPOINT TO ADD USER TO DATABASE
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // IF SUCCESSFUL, REDIRECT TO HOMEPAGE
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  // CLICK EVENT LISTENER FOR SUBMIT BUTTON ON SIGNUP FORM
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);