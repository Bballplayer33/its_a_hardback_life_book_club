const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#review-title').value.trim();
  const content = document.querySelector('#review-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/reviews`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

document
  .querySelector('.new-review-form')
  .addEventListener('submit', newFormHandler);

// Makes review cards toggle from expanded to collapsed
document.addEventListener('DOMContentLoaded', function () {
  let cardToggles = document.getElementsByClassName('card-toggle');
  for (let i = 0; i < cardToggles.length; i++) {
    cardToggles[i].addEventListener('click', (e) => {
      e.currentTarget.parentElement.parentElement.childNodes[3].classList.toggle(
        'is-hidden'
      );
    });
  }
});
