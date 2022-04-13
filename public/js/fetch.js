// //Fetch data from OpenLibrary API and render to search.handlebars & main.handlebars
window.onload = () => {
const getBooks = async (event) => {
    event.preventDefault();
    document.getElementById('output').innerHTML = '';
    console.log("Search clicked");
    const response = await
    fetch('http://openlibrary.org/search.json?q=' +
        document.getElementById('input').value)
        .then(a => a.json())
        .then(data => {
            console.log(data);
            for (var i = 0; i < 10; i++) {
                document.getElementById('output').innerHTML +=
                    '<h2>' +
                    data.docs[i].title +
                    '</h2>' +
                    data.docs[i].author_name[0] 
                    if (typeof data.docs[i].isbn[0] !== undefined) {
                    document.getElementById('output').innerHTML +=
                    '<br><img src="http://covers.openlibrary.org/b/isbn/' +
                    data.docs[i].isbn[0] + '-M.jpg"><br>'
                    };
            }
        });
}

document.getElementById("bookName").addEventListener("click", getBooks);
}