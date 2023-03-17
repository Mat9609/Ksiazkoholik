$(document).ready(function () {});

function addToTable() {
  let table = document.getElementById("table-rows");
  let newRow = document.createElement("tr");
  let lp = document.createElement("td");
  let title = document.createElement("td");
  let author = document.createElement("td");
  let image = document.createElement("td");
  let publishDate = document.createElement("td");
  let numberOfPages = document.createElement("td");
  let showMoreRow = document.createElement("td");
  let addBook = document.createElement("td");
  lp.innerHTML = document.getElementById("table-rows").children.length + 1;
  title.innerHTML = document.getElementById("ftitle").value;
  author.innerHTML = document.getElementById("fauthor").value;
  image.innerHTML = `<img src=${document.getElementById("fimage").value} class="table-image">`;
  publishDate.innerHTML = document.getElementById("fdate").value;
  numberOfPages.innerHTML = document.getElementById("fpagesNumber").value;

  newRow.appendChild(lp);
  newRow.appendChild(title);
  newRow.appendChild(author);
  newRow.appendChild(image);
  newRow.appendChild(publishDate);
  newRow.appendChild(numberOfPages);
  newRow.appendChild(showMoreRow);
  newRow.appendChild(addBook);
  table.appendChild(newRow);
  var modalForm = document.getElementById("myFormModal");
  modalForm.style.display = "none";
}

function showForm() {
  var modalForm = document.getElementById("myFormModal");
  // Get the <span> element that closes the modal
  var spanForm = document.getElementsByClassName("closeForm")[0];
  // When the user clicks the button, open the modal
  modalForm.style.display = "block";

  spanForm.onclick = function () {
    modalForm.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modalForm) {
      modalForm.style.display = "none";
    }
  };
}

function showMore(link) {
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
          alert("Book list not found");
        else alert("Cannot download book list - server error");
      //Brak odpowiedzi z serwera
      else alert("No connection");
    });

  bookResponse.then(function (response) {
    let booksData = response;
    console.log(booksData.volumeInfo);
    var modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the modal
    modal.style.display = "block";

    let titleModal = document.createElement("h2");
    if (booksData.volumeInfo.hasOwnProperty("title")) {
      titleModal.innerHTML = booksData.volumeInfo.title;
    } else {
      titleModal.innerHTML = "Brak danych";
    }

    let authorModal = document.createElement("h4");
    if (booksData.volumeInfo.hasOwnProperty("authors")) {
      authorModal.innerHTML = booksData.volumeInfo.authors[0];
    } else {
      authorModal.innerHTML = "Brak danych";
    }

    let description = document.createElement("p");
    if (booksData.volumeInfo.hasOwnProperty("description")) {
      description.innerHTML = booksData.volumeInfo.description;
      description.classList.add("description");
    } else {
      description.innerHTML = "Brak danych";
    }

    let imageModal = document.createElement("img");
    if (booksData.volumeInfo.hasOwnProperty("imageLinks")) {
      imageModal.src = booksData.volumeInfo.imageLinks.smallThumbnail;
      imageModal.classList.add("modal-image");
    } else {
      imageModal.src = "";
    }

    var aboutBook = document.getElementsByClassName("about-book")[0];
    aboutBook.appendChild(imageModal);
    aboutBook.appendChild(description);

    var titleContent = document.getElementsByClassName("title")[0];
    titleContent.appendChild(titleModal);

    var authorContent = document.getElementsByClassName("author")[0];
    authorContent.appendChild(authorModal);

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
      titleContent.removeChild(titleModal);
      authorContent.removeChild(authorModal);
      aboutBook.removeChild(description);
      aboutBook.removeChild(imageModal);
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        titleContent.removeChild(titleModal);
        authorContent.removeChild(authorModal);
        aboutBook.removeChild(description);
        aboutBook.removeChild(imageModal);
      }
    };
  });
}

function refreshData() {
  //Utworzenie żądania GET i jego parametrów
  let booksResponse = $.ajax({
    type: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?q=inpublisher:fabryka+slow&langRestrict=pl&printType=books&maxResults=10&orderBy=newest",
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
          alert("Book list not found");
        else alert("Cannot download book list - server error");
      //Brak odpowiedzi z serwera
      else alert("No connection");
    });

  booksResponse.then(function (response) {
    let booksData = response.items;
    let table = document.getElementById("table-rows");
    let index = 1;
    for (let j in booksData) {
      if (booksData[j].volumeInfo.hasOwnProperty("imageLinks")) {
        let newRow = document.createElement("tr");
        let lp = document.createElement("td");
        let title = document.createElement("td");
        let author = document.createElement("td");
        let image = document.createElement("td");
        let publishDate = document.createElement("td");
        let numberOfPages = document.createElement("td");
        let showMoreRow = document.createElement("td");
        let addBook = document.createElement("td");
        lp.innerHTML = index;
        if (booksData[j].volumeInfo.hasOwnProperty("title")) {
          title.innerHTML = booksData[j].volumeInfo.title;
        } else {
          title.innerHTML = "Brak danych";
        }
        if (booksData[j].volumeInfo.hasOwnProperty("authors")) {
          author.innerHTML = booksData[j].volumeInfo.authors[0];
        } else {
          author.innerHTML = "Brak danych";
        }
        if (booksData[j].volumeInfo.hasOwnProperty("imageLinks")) {
          image.innerHTML = `<img src=${booksData[j].volumeInfo.imageLinks.smallThumbnail} class="table-image">`;
        } else {
          image.innerHTML = "Brak danych";
        }
        if (booksData[j].volumeInfo.hasOwnProperty("publishedDate")) {
          publishDate.innerHTML = booksData[j].volumeInfo.publishedDate;
        } else {
          publishDate.innerHTML = "Brak danych";
        }
        if (booksData[j].volumeInfo.hasOwnProperty("pageCount")) {
          numberOfPages.innerHTML = booksData[j].volumeInfo.pageCount;
        } else {
          numberOfPages.innerHTML = "Brak danych";
        }
        console.log(booksData[j].selfLink);
        var showMoreElement = document.createElement("input");
        showMoreElement.type = "button";
        showMoreElement.value = "Więcej";
        showMoreElement.addEventListener("click", function () {
          showMore(booksData[j].selfLink);
        });
        showMoreElement.classList.add("btn");
        showMoreElement.classList.add("btn-outline-dark");
        showMoreElement.classList.add("rounded");
        showMoreElement.classList.add("ms-1");
        showMoreElement.classList.add("fs-2");
        showMoreRow.appendChild(showMoreElement);

        var storedLinks = JSON.parse(localStorage.getItem("links"));
        console.log(storedLinks);
        if (storedLinks == null) {
          storedLinks = [];
        }
        if (storedLinks.includes(booksData[j].selfLink)) {
          console.log("Bingo!");
          var addToShelf = document.createElement("input");
          addToShelf.type = "button";
          addToShelf.value = "Dodano na półkę";
          addToShelf.style.backgroundColor = "green";
        } else {
          var addToShelf = document.createElement("input");
          addToShelf.type = "button";
          addToShelf.value = "Dodaj na półkę";
          addToShelf.addEventListener("click", function () {
            var storedLinks = JSON.parse(localStorage.getItem("links"));
            if (storedLinks == null) {
              storedLinks = [];
            }
            console.log(storedLinks);
            this.value = "Dodano na półkę";
            this.style.backgroundColor = "green";
            if (storedLinks.includes(booksData[j].selfLink) == false) {
              addBookToShelf(booksData[j].selfLink);
            }
          });
        }
        addToShelf.classList.add("btn");
        addToShelf.classList.add("btn-outline-dark");
        addToShelf.classList.add("rounded");
        addToShelf.classList.add("ms-1");
        addToShelf.classList.add("fs-2");
        addBook.appendChild(addToShelf);

        newRow.appendChild(lp);
        newRow.appendChild(title);
        newRow.appendChild(author);
        newRow.appendChild(image);
        newRow.appendChild(publishDate);
        newRow.appendChild(numberOfPages);
        newRow.appendChild(showMoreRow);
        newRow.appendChild(addBook);
        table.appendChild(newRow);
        index++;
      }
    }
  });
}

function search() {
  //Utworzenie żądania GET i jego parametrów
  let searchQuote = document.getElementById("search-book").value;
  let booksSearchResponse = $.ajax({
    type: "GET",
    url: `https://www.googleapis.com/books/v1/volumes?q=${searchQuote}&printType=books&maxResults=10&orderBy=relevance`,
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
          alert("Book list not found");
        else alert("Cannot download book list - server error");
      //Brak odpowiedzi z serwera
      else alert("No connection");
    });

  booksSearchResponse.then(function (response) {
    let booksData = response.items;
    let table = document.getElementById("table-rows");
    let index = 1;
    $("#top-books tbody").html("");
    for (let j in booksData) {
      if (booksData[j].volumeInfo.hasOwnProperty("imageLinks")) {
        let newRow = document.createElement("tr");
        let lp = document.createElement("td");
        let title = document.createElement("td");
        let author = document.createElement("td");
        let image = document.createElement("td");
        let publishDate = document.createElement("td");
        let numberOfPages = document.createElement("td");
        let showMoreRow = document.createElement("td");
        let addBook = document.createElement("td");
        lp.innerHTML = index;
        if (booksData[j].volumeInfo.hasOwnProperty("title")) {
          title.innerHTML = booksData[j].volumeInfo.title;
        } else {
          title.innerHTML = "Brak danych";
        }
        if (booksData[j].volumeInfo.hasOwnProperty("authors")) {
          author.innerHTML = booksData[j].volumeInfo.authors[0];
        } else {
          author.innerHTML = "Brak danych";
        }
        if (booksData[j].volumeInfo.hasOwnProperty("imageLinks")) {
          image.innerHTML = `<img src=${booksData[j].volumeInfo.imageLinks.smallThumbnail}>`;
        } else {
          image.innerHTML = "Brak danych";
        }
        if (booksData[j].volumeInfo.hasOwnProperty("publishedDate")) {
          publishDate.innerHTML = booksData[j].volumeInfo.publishedDate;
        } else {
          publishDate.innerHTML = "Brak danych";
        }
        if (booksData[j].volumeInfo.hasOwnProperty("pageCount")) {
          numberOfPages.innerHTML = booksData[j].volumeInfo.pageCount;
        } else {
          numberOfPages.innerHTML = "Brak danych";
        }
        console.log(booksData[j].selfLink);
        var showMoreElement = document.createElement("input");
        showMoreElement.type = "button";
        showMoreElement.value = "Więcej";
        showMoreElement.addEventListener("click", function () {
          showMore(booksData[j].selfLink);
        });
        showMoreElement.classList.add("btn");
        showMoreElement.classList.add("btn-outline-dark");
        showMoreElement.classList.add("rounded");
        showMoreElement.classList.add("ms-1");
        showMoreElement.classList.add("fs-2");
        showMoreRow.appendChild(showMoreElement);

        var storedLinks = JSON.parse(localStorage.getItem("links"));
        if (storedLinks == null) {
          storedLinks = [];
        }
        if (storedLinks.includes(booksData[j].selfLink)) {
          console.log("Bingo!");
          var addToShelf = document.createElement("input");
          addToShelf.type = "button";
          addToShelf.value = "Dodano na półkę";
          addToShelf.style.backgroundColor = "green";
        } else {
          var addToShelf = document.createElement("input");
          addToShelf.type = "button";
          addToShelf.value = "Dodaj na półkę";
          addToShelf.addEventListener("click", function () {
            var storedLinks = JSON.parse(localStorage.getItem("links"));
            if (storedLinks == null) {
              storedLinks = [];
            }
            console.log(storedLinks);
            this.value = "Dodano na półkę";
            this.style.backgroundColor = "green";
            if (storedLinks.includes(booksData[j].selfLink) == false) {
              addBookToShelf(booksData[j].selfLink);
            }
          });
        }

        addToShelf.classList.add("btn");
        addToShelf.classList.add("btn-outline-dark");
        addToShelf.classList.add("rounded");
        addToShelf.classList.add("ms-1");
        addToShelf.classList.add("fs-2");
        addBook.appendChild(addToShelf);

        newRow.appendChild(lp);
        newRow.appendChild(title);
        newRow.appendChild(author);
        newRow.appendChild(image);
        newRow.appendChild(publishDate);
        newRow.appendChild(numberOfPages);
        newRow.appendChild(showMoreRow);
        newRow.appendChild(addBook);
        table.appendChild(newRow);

        index++;
      }
    }
  });
}

function addBookToShelf(link, button) {
  if (typeof Storage !== "undefined") {
    links.push(link);
    localStorage.setItem("links", JSON.stringify(links));
    var storedLinks = JSON.parse(localStorage.getItem("links"));
    console.log(storedLinks);
  }
}

var links = JSON.parse(localStorage.getItem("links"));
if (links === null) {
  links = [];
}
refreshData();
