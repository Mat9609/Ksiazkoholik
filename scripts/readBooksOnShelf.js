function getBook(link) {
  console.log(link);
  //Utworzenie żądania GET i jego parametrów
  let bookResponse = $.ajax({
    type: "GET",
    url: link,
    //I inne parametry żądania
  })
    .done(function (response) {
      //Funkcja wykonująca się po otrzymaniu z serwera odpowiedzi OK (status 200)
      var books = response.items;
      //Uruchomienie funkcji dodającej kraje do listy wybieralnej
    })
    .fail(function (error) {
      //Funkcja wykonująca się gdy połączenie nie zakończy się sukcesem lub serwer zwróci błąd
      if (error.response)
        if (error.response.status == 404)
          //Istenieje odpowiedź z serwera
          alert("Book not found");
        else alert("Cannot download book - server error");
      //Brak odpowiedzi z serwera
      else alert("No connection");
    });

  bookResponse.then(function (response) {
    let booksData = response;
    console.log(booksData.volumeInfo);

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
  console.log(storedLinks);
  for (let link in storedLinks) {
    getBook(storedLinks[link]);
  }
});
