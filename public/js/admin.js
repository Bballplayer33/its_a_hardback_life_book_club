const delButtonHandler = async (event) => {
  event.target.classList.add('is-loading');
  // const deleteEl = document.getElementsByClassName('loader');
  const id = event.target.getAttribute('data-id');
  console.log(id);

  const response = await fetch(`/api/users/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/admin');
  } else {
    alert('Failed to delete user');
  }
};

const destroy = document.querySelectorAll('.destroy');
destroy.forEach((el) => {
  el.addEventListener('click', delButtonHandler);
});

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
