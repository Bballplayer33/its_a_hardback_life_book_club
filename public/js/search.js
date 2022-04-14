const saveSearch = async () => {
  const searchTitle = document.querySelector('.search-title').value;
  const searchAuthor = document.querySelector('.search-author').value;
  const searchLink = document.querySelector('.search-link').value;
  if (searchTitle && searchAuthor && searchLink) {
    const response = await fetch(`/api/books`, {
      method: 'POST',
      body: JSON.stringify({ searchTitle, searchAuthor, searchLink }),
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
  .getElementsByClassName('search-btn')
  .addEventListener('click', saveSearch);
