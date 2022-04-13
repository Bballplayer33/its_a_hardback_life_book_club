const editButtonHandler = async (event) => {
  event.preventDefault();

  console.log('edit btn function called');
  const title = document.querySelector('#edit-title').value;
  const author = document.querySelector('#edit-author').value;
  if (title && author) {
    console.log(`${title} and ${author}`);
    const response = await fetch(`/api/currentBook/1`, {
      method: 'PUT',
      body: JSON.stringify({ title, author }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace(`/profile`);
    } else {
      alert('Failed to update book.');
    }
  } else {
    console.log('if statement did not pass');
  }
};
document
  .querySelector('.edit-book-form')
  .addEventListener('submit', editButtonHandler);

let button = document.getElementById('edit-book-button');
let input = document.getElementById('edit-book-div');
let save = document.getElementById('save-current-book-button');

button.onclick = function () {
  input.classList.toggle('active');
};

const renderCurrentBook = async () => {
  const response = await fetch('api/currentBook', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const currentBook = await response.json();
    const data = currentBook[0];
    const title = document.getElementById('current-title');
    const author = document.getElementById('current-author');
    title.innerHTML = data.title;
    author.innerHTML = `by ${data.author}`;
  } else {
    console.log('error');
  }
};
renderCurrentBook();
