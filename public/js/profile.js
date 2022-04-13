let radioInputs = document.getElementsByClassName('star-radio');

let selected = 0;

for (let idx = 0; idx < radioInputs.length; idx++) {
  let current = radioInputs[idx];
  current.onclick = function () {
    selected = current.value;
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
