const getCurrentBook = () => {
  fetch('api/currentBook/1', {
    method: 'GET',
  });
};
