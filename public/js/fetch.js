// //Fetch data from OpenLibrary API and render to search.handlebars & main.handlebars
window.onload = () => {
  const getBooks = async (event) => {
    event.preventDefault();
    document.getElementById('output').innerHTML = '';
    document.getElementById('output').innerHTML +=
      '<div class="panel" id="custom-search"><p class="panel-heading has-text-centered">Results</p></div>';
    const response = await fetch(
      'https://openlibrary.org/search.json?q=' +
        document.getElementById('input').value
    )
      .then((a) => a.json())
      .then((data) => {
        console.log(data);
        for (var i = 0; i < 10; i++) {
          document.getElementById(
            'output'
          ).innerHTML += `<div class="panel-block is-flex is-flex-wrap is-justify-content-center" aria-hidden="true"> <div class="wrapper">
                <p> Title: 
                    <span class="search-title">${data.docs[i].title}</span>
                </p>
                <p> Author: 
                    <span class="search-author">${data.docs[i].author_name[0]}</span>
                </p>
                <a class="button search-link" href="https://openlibrary.org${data.docs[i].seed[0]}" target="_blank">Check Availability</a>
                <a class="button search-btn" onclick="saveSearch(event)">Save This Search</a>`;

          if (typeof data.docs[i].isbn[0] !== undefined) {
            document.getElementById('output').innerHTML +=
              '<br><img class="opacity" src="https://covers.openlibrary.org/b/isbn/' +
              data.docs[i + 1].isbn[0] +
              '-M.jpg"><br></div></div>';
          }
        }
      });
  };
  const bookName = document.getElementById('bookName');
  if (bookName != null && bookName != undefined) {
    bookName.addEventListener('click', getBooks);
  }
};
