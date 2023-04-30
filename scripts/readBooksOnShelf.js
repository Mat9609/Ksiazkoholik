function getBook(link) {
  //used to get book info from api to show it on shelf site
  let bookResponse = $.ajax({
    type: "GET",
    url: link,
  })
    .done(function (response) {
      var books = response.items;
    })
    .fail(function (error) {
      if (error.response)
        if (error.response.status == 404) alert("Book not found");
        else alert("Cannot download book - server error");
      else alert("No connection");
    });
  bookResponse.then(function (response) {
    let booksData = response;
    let col = document.createElement("div");
    col.classList.add("shelf-book");
    let image = document.createElement("img");
    if (booksData.volumeInfo.hasOwnProperty("imageLinks")) {
      image.src = booksData.volumeInfo.imageLinks.smallThumbnail;
      image.classList.add("shelf-image");
    } else {
      image.src = "";
    }
    let title = document.createElement("h2");
    if (booksData.volumeInfo.hasOwnProperty("title")) {
      title.innerHTML = booksData.volumeInfo.title;
    } else {
      title.innerHTML = "Brak danych";
    }
    let author = document.createElement("h4");
    if (booksData.volumeInfo.hasOwnProperty("authors")) {
      author.innerHTML = booksData.volumeInfo.authors[0];
    } else {
      author.innerHTML = "Brak danych";
    }
    col.appendChild(image);
    col.appendChild(title);
    col.appendChild(author);

    let row = document.getElementById("shelf-row");
    row.appendChild(col);
  });
}

$(document).ready(function () {
  var storedLinks = JSON.parse(localStorage.getItem("links"));
  if (storedLinks == null) {
    let noBooksText = document.createElement("h2");
    noBooksText.innerHTML = "Brak książek na półce";
    let noBooksDiv = document.getElementById("no-books-div");
    noBooksText.classList.add("no-books-text");
    noBooksDiv.appendChild(noBooksText);
  }
  for (let link in storedLinks) {
    getBook(storedLinks[link]);
  }
});
