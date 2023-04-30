function addToTable() {
  //used to validate and add new book to table
  if ($("#basic-form").valid()) {
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
    image.innerHTML = `<img src=${
      document.getElementById("fimage").value
    } class="table-image">`;
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
}

function showForm() {
  //used to show form to add new book to table
  var modalForm = document.getElementById("myFormModal");
  var spanForm = document.getElementsByClassName("closeForm")[0];
  modalForm.style.display = "block";
  spanForm.onclick = function () {
    modalForm.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modalForm) {
      modalForm.style.display = "none";
    }
  };
}

function showEditForm(indexToEdit) {
  //used to show form to edit book in table
  var modalForm = document.getElementById("editBookModal");
  var spanForm = document.getElementsByClassName("closeEditForm")[0];
  modalForm.style.display = "block";
  spanForm.onclick = function () {
    modalForm.style.display = "none";
  };
  spanForm.onclick = function () {
    modalForm.style.display = "none";
  };

  indexToEdit = Number(indexToEdit) + 1;

  console.log(indexToEdit);
  let title = document.getElementById("etitle");
  let author = document.getElementById("eauthor");
  let image = document.getElementById("eimage");
  let publishDate = document.getElementById("epublishDate");
  let numberOfPages = document.getElementById("epagesNumber");
  title.value = document.getElementById(
    "title" + indexToEdit.toString()
  ).innerHTML;
  author.value = document.getElementById(
    "author" + indexToEdit.toString()
  ).innerHTML;
  if (
    document.getElementById("image" + indexToEdit.toString()).children[0] != null
  ) {
    image.value = document.getElementById(
      "image" + indexToEdit.toString()
    ).children[0].src;
  }
  publishDate.value = document.getElementById(
    "publishDate" + indexToEdit.toString()
  ).innerHTML;
  numberOfPages.value = document.getElementById(
    "numberOfPages" + indexToEdit.toString()
  ).innerHTML;
  let editButton = document.getElementById("editBookButton");
  editButton.onclick = function () {
    let title = document.getElementById("title" + indexToEdit.toString());
    let author = document.getElementById("author" + indexToEdit.toString());
    let image = document.getElementById("image" + indexToEdit.toString());
    let publishDate = document.getElementById(
      "publishDate" + indexToEdit.toString()
    );
    let numberOfPages = document.getElementById(
      "numberOfPages" + indexToEdit.toString()
    );
    title.innerHTML = document.getElementById("etitle").value;
    author.innerHTML = document.getElementById("eauthor").value;
    image.innerHTML = `<img src=${
      document.getElementById("eimage").value
    } class="table-image">`;
    publishDate.innerHTML = document.getElementById("epublishDate").value;
    numberOfPages.innerHTML = document.getElementById("epagesNumber").value;
    modalForm.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modalForm) {
      modalForm.style.display = "none";
    }
  };
}

function showMore(link) {
  //used to show modal with more info about book. More info is downloaded from api thanks to saved link
  let bookResponse = $.ajax({
    type: "GET",
    url: link,
  })
    .done(function (response) {
      var books = response.items;
    })
    .fail(function (error) {
      if (error.response)
        if (error.response.status == 404) alert("Book list not found");
        else alert("Cannot download book list - server error");
      else alert("No connection");
    });
  bookResponse.then(function (response) {
    let booksData = response;
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
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
    span.onclick = function () {
      modal.style.display = "none";
      titleContent.removeChild(titleModal);
      authorContent.removeChild(authorModal);
      aboutBook.removeChild(description);
      aboutBook.removeChild(imageModal);
    };
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
  //refresh data on first opening of site or when it is needed
  let booksResponse = $.ajax({
    type: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?q=inpublisher:fabryka+slow&langRestrict=pl&printType=books&maxResults=10&orderBy=newest",
  })
    .done(function (response) {
      var books = response.items;
    })
    .fail(function (error) {
      if (error.response)
        if (error.response.status == 404) alert("Book list not found");
        else alert("Cannot download book list - server error");
      else alert("No connection");
    });
  booksResponse.then(function (response) {
    let booksData = response.items;
    let table = document.getElementById("table-rows");
    let index = 1;
    for (let j in booksData) {
      if (booksData[j].volumeInfo.hasOwnProperty("title")) {
        let newRow = document.createElement("tr");
        let lp = document.createElement("td");
        let title = document.createElement("td");
        let author = document.createElement("td");
        let image = document.createElement("td");
        let publishDate = document.createElement("td");
        let numberOfPages = document.createElement("td");
        let showMoreRow = document.createElement("td");
        let addBook = document.createElement("td");
        let editBook = document.createElement("td");
        lp.innerHTML = index;
        if (booksData[j].volumeInfo.hasOwnProperty("title")) {
          title.innerHTML = booksData[j].volumeInfo.title;
        } else {
          title.innerHTML = "Brak danych";
        }
        title.id = "title" + index.toString();
        if (booksData[j].volumeInfo.hasOwnProperty("authors")) {
          author.innerHTML = booksData[j].volumeInfo.authors[0];
        } else {
          author.innerHTML = "Brak danych";
        }
        author.id = "author" + index.toString();
        if (booksData[j].volumeInfo.hasOwnProperty("imageLinks")) {
          image.innerHTML = `<img src=${booksData[j].volumeInfo.imageLinks.smallThumbnail} class="table-image">`;
        } else {
          image.innerHTML = "Brak danych";
        }
        image.id = "image" + +index.toString();
        if (booksData[j].volumeInfo.hasOwnProperty("publishedDate")) {
          publishDate.innerHTML = booksData[j].volumeInfo.publishedDate;
        } else {
          publishDate.innerHTML = "Brak danych";
        }
        publishDate.id = "publishDate" + index.toString();
        if (booksData[j].volumeInfo.hasOwnProperty("pageCount")) {
          numberOfPages.innerHTML = booksData[j].volumeInfo.pageCount;
        } else {
          numberOfPages.innerHTML = "Brak danych";
        }
        numberOfPages.id = "numberOfPages" + index.toString();
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
        var editElement = document.createElement("input");
        editElement.type = "button";
        editElement.value = "Edytuj";
        editElement.addEventListener("click", function () {
          showEditForm(j);
        });
        editElement.classList.add("btn");
        editElement.classList.add("btn-outline-dark");
        editElement.classList.add("rounded");
        editElement.classList.add("ms-1");
        editElement.classList.add("fs-2");
        editBook.appendChild(editElement);
        editBook.id = "editButton" + index.toString();
        var storedLinks = JSON.parse(localStorage.getItem("links"));
        if (storedLinks == null) {
          storedLinks = [];
        }
        if (storedLinks.includes(booksData[j].selfLink)) {
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
        newRow.appendChild(editBook);
        table.appendChild(newRow);
        index++;
      }
    }
  });
}

function search() {
  //used to search for books using google api. prompt entered by user is used in link to api
  let searchQuote = document.getElementById("search-book").value;
  let booksSearchResponse = $.ajax({
    type: "GET",
    url: `https://www.googleapis.com/books/v1/volumes?q=${searchQuote}&printType=books&maxResults=10&orderBy=relevance`,
  })
    .done(function (response) {
      var books = response.items;
    })
    .fail(function (error) {
      if (error.response)
        if (error.response.status == 404) alert("Book list not found");
        else alert("Cannot download book list - server error");
      else alert("No connection");
    });
  booksSearchResponse.then(function (response) {
    let booksData = response.items;
    let table = document.getElementById("table-rows");
    let index = 1;
    $("#top-books tbody").html("");
    for (let j in booksData) {
      console.log(j);
      if (booksData[j].volumeInfo.hasOwnProperty("title")) {
        let newRow = document.createElement("tr");
        let lp = document.createElement("td");
        let title = document.createElement("td");
        let author = document.createElement("td");
        let image = document.createElement("td");
        let publishDate = document.createElement("td");
        let numberOfPages = document.createElement("td");
        let showMoreRow = document.createElement("td");
        let addBook = document.createElement("td");
        let editBook = document.createElement("td");
        lp.innerHTML = index;
        if (booksData[j].volumeInfo.hasOwnProperty("title")) {
          title.innerHTML = booksData[j].volumeInfo.title;
        } else {
          title.innerHTML = "Brak danych";
        }
        title.id = "title" + index.toString();
        if (booksData[j].volumeInfo.hasOwnProperty("authors")) {
          author.innerHTML = booksData[j].volumeInfo.authors[0];
        } else {
          author.innerHTML = "Brak danych";
        }
        author.id = "author" + index.toString();
        if (booksData[j].volumeInfo.hasOwnProperty("imageLinks")) {
          image.innerHTML = `<img src=${booksData[j].volumeInfo.imageLinks.smallThumbnail}>`;
        } else {
          image.innerHTML = "Brak danych";
        }
        image.id = "image" + index.toString();
        if (booksData[j].volumeInfo.hasOwnProperty("publishedDate")) {
          publishDate.innerHTML = booksData[j].volumeInfo.publishedDate;
        } else {
          publishDate.innerHTML = "Brak danych";
        }
        publishDate.id = "publishDate" + index.toString();
        if (booksData[j].volumeInfo.hasOwnProperty("pageCount")) {
          numberOfPages.innerHTML = booksData[j].volumeInfo.pageCount;
        } else {
          numberOfPages.innerHTML = "Brak danych";
        }
        numberOfPages.id = "numberOfPages" + index.toString();
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

        var editElement = document.createElement("input");
        editElement.type = "button";
        editElement.value = "Edytuj";
        editElement.addEventListener("click", function () {
          showEditForm(j);
        });
        editElement.classList.add("btn");
        editElement.classList.add("btn-outline-dark");
        editElement.classList.add("rounded");
        editElement.classList.add("ms-1");
        editElement.classList.add("fs-2");
        editBook.appendChild(editElement);
        editBook.id = "editButton" + index.toString();

        var storedLinks = JSON.parse(localStorage.getItem("links"));
        if (storedLinks == null) {
          storedLinks = [];
        }
        if (storedLinks.includes(booksData[j].selfLink)) {
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
        newRow.appendChild(editBook);
        table.appendChild(newRow);
        index++;
      }
    }
  });
}

function addBookToShelf(link, button) {
  //used to add book to shelf - save it's link to local storage
  if (typeof Storage !== "undefined") {
    links.push(link);
    localStorage.setItem("links", JSON.stringify(links));
    var storedLinks = JSON.parse(localStorage.getItem("links"));
  }
}

var links = JSON.parse(localStorage.getItem("links"));
if (links === null) {
  links = [];
}

refreshData();
