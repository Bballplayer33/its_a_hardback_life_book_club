const saveSearch = async (e) => {
  const target = e.target;
  const parent = target.parentNode;
  const searchTitle = parent.querySelector('.search-title').textContent;
  const searchAuthor = parent.querySelector('.search-author').textContent;
  const searchLink = parent.querySelector('.search-link').getAttribute('href');
  console.log(
    `title: ${searchTitle}, author: ${searchAuthor}, link: ${searchLink}`
  );
  if (searchTitle && searchAuthor && searchLink) {
    const response = await fetch(`/api/books`, {
      method: 'POST',
      body: JSON.stringify({
        title: searchTitle,
        author: searchAuthor,
        link: searchLink,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      console.log(response);
      alert('Failed to create post');
    }
  }
};
