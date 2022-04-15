// delete book
const killButtonHandler = async (id) => {
  console.log(`user ID: ${id}`);

  const response = await fetch(`/api/books/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert('Failed to delete book');
  }
};
