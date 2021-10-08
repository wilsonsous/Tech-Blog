// FUNCTION FOR HANDLING DELETE POST BUTTON
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      // GET THE POST ID NUMBER FROM DATA-ID ATTRIBUTE OF BUTTON
      const id = event.target.getAttribute('data-id');
  
      // SEND A DELETE REQUEST TO THE API ENDPOINT TO DELETE THE POST
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // IF SUCCESSFUL, REDIRECT THE PAGE TO THE USER'S DASHBOARD
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    };
  };
  
  // CLICK EVENT LISTENER FOR DELETE POST BUTTON
  document
    .querySelector('#delete-post')
    .addEventListener('click', delButtonHandler);