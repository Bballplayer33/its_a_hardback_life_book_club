// Star rating
let radioInputs = document.getElementsByClassName('star-radio');

let selected = 0;

for (let idx = 0; idx < radioInputs.length; idx++) {
  let current = radioInputs[idx];
  current.onclick = function () {
    selected = current.value;
    console.log(selected);
    for (let idx2 = 0; idx2 < radioInputs.length; idx2++) {
      let radioGuy = radioInputs[idx2];
      if (radioGuy.value <= selected) {
        let icon = radioGuy.previousSibling;
        icon.classList.add('checked');
      } else {
        let icon = radioGuy.previousSibling;
        icon.classList.remove('checked');
      }
    }
  };
}
// user input
const newFormHandler = async (event) => {
  event.preventDefault();
  const rating = document.querySelector('input[name="star"]:checked').value;
  const title = document.querySelector('#review-title').value.trim();
  const content = document.querySelector('#review-content').value.trim();
  if (rating && title && content) {
    const response = await fetch(`/api/reviews`, {
      method: 'POST',
      body: JSON.stringify({ rating, title, content }),
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
