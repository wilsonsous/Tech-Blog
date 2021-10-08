// FUNCTION FOR HANDLING ADD COMMENT FORM
const commentFormHandler = async (event) => {
    event.preventDefault();
  
    // COLLECT COMMENT FROM ADD COMMENT FORM
    const comment = document.querySelector('#comment').value.trim();
    // GET POST ID FOR COMMENT FROM URL
    const post_id = parseInt(document.location.href.split("/").pop());
  
    if (comment && post_id) {
      // SEND A POST REQUEST TO THE API ENDPOINT TO ADD NEW COMMENT TO THE SPECIFIED POST
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // IF SUCCESSFUL, RELOAD THE PAGE WITH NEW COMMENT ADDED
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  };
  
  // CLICK EVENT LISTENER TO SUBMIT BUTTON ON NEW COMMENT FORM
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', commentFormHandler);