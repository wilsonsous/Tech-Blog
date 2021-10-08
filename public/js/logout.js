// FUNCTION FOR HANDLING LOGOUT BUTTON IN NAV BAR
const logout = async () => {
    // SEND A POST REQUEST TO THE API ENDPOINT TO LOGOUT USER
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // REDIRECT TO HOMEPAGE
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  
  // CLICK EVENT LISTENER FOR LOGOUT BUTTON
  document.querySelector('#logout-link').addEventListener('click', logout);