// delete user
const delButtonHandler = async (event) => {
  event.target.classList.add('is-loading');
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

// edit user
const editButtonHandler = async (event) => {
  event.preventDefault();
  const target = event.target;
  const parent = target.parentNode;
  const name = parent.querySelector('.edit-name').value;
  const email = parent.querySelector('.edit-email').value;
  const role = parent.querySelector('.edit-role').value;
  const id = target.getAttribute('data-id');
  if (name && email && role) {
    console.log(`${name}, ${email}, ${id}, ${role}`);
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, email, role }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace(`/members`);
    } else {
      alert('Failed to update user.');
    }
  } else {
    console.log('if statement did not pass');
  }
};

// collapsible cards
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
