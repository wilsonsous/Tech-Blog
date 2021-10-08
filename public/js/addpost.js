// FUNCTION FOR HANDLING ADD POST FORM
const postFormHandler = async (event) => {
    event.preventDefault();
  
    // COLLECT VALUES FOR NEW POST FROM FORM
    const title = document.querySelector('#title').value.trim();
    const text = document.querySelector('#text').value.trim();
      
    if (title && text) {
      // SEND A POST REQUEST TO THE API ENDPOINT TO ADD POST
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, text }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // IF SUCCESSFUL, REDIRECT TO THE USER'S DASHBOARD
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  // CLICK EVENT LISTENER FOR SUBMIT BUTTON ON CREATE POST FORM
  document
    .querySelector('.add-post-form')
    .addEventListener('submit', postFormHandler);