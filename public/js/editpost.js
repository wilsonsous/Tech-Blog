
// FUNCTION FOR HANDLING EDIT POST FORM
async function editFormHandler(event) {
    event.preventDefault();
  
    // COLLECT VALUES FROM EDIT POST FORM
    const title = document.querySelector('#title').value;
    const text = document.querySelector('#text').value;
  
    // GRAB THE POST ID # FROM THE URL
    const post_id = parseInt(document.location.href.split("/").pop());
  
    if (title && text) {
      // SEND A PUT REQUEST TO THE API ENDPOINT TO EDIT POST
      const response = await fetch(`/api/posts/${post_id}`, {
          method: 'PUT',
          body: JSON.stringify({
            title,
            text,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          // IF SUCCESSFUL, REDIRECT TO THE UPDATED POST PAGE
          document.location.replace(`/posts/${post_id}`);
        } else {
          alert(response.statusText);
        }
    }
  }
  
  // CLICK EVENT LISTENER FOR SUBMIT BUTTON ON EDIT POST FORM
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);