// Makes member cards toggle from expanded to collapsed
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
