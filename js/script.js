const searchInputEl = document.getElementById('bookInput');
const submitBtn = document.getElementById('submitButton');
const titleEl = document.getElementById('resultsTitle');
const authorEl = document.getElementById('resultsAuthor');
const genreEl = document.getElementById('resultsGenre');
const descriptionEl = document.getElementById('resultsDescrip');
const bookImgEl = document.getElementById('resultsImg');
let libraryArr = [];
// document.body.append(titleEl);
// document.body.append(authorEl);
// document.body.append(genreEl);
// document.body.append(descriptionEl);
// document.body.append(bookImgEl);

<<<<<<< HEAD
=======
function setArrayToLocalStorage (){
    console.log(libraryArr);
    libraryArr = localStorage.getItem("bookStorage");
};

setArrayToLocalStorage ();

submitBtn.addEventListener('click', handleClick)
function handleClick() {
    const userQuery = searchInputEl.value;
    getAPI(userQuery);
};
>>>>>>> main

// Searches the api using user's query and gives top 10 results
function getAPI(bookSearch) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookSearch}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log("---STRING---", data.items)
            handleData(data)
        });
};

function buildRow(book){
    let bookResultsTable = document.getElementById('book-search-results');
    const shortDescription = book.volumeInfo.description.split('.')[0];
    let trEl = document.createElement('tr');
    trEl.classList.add('book-info-row');
    buildTdWithInfo(book.volumeInfo.title, trEl);
    buildTdWithInfo(book.volumeInfo.authors, trEl);
    buildTdWithInfo(book.volumeInfo.categories, trEl);
    buildTdWithInfo(shortDescription, trEl);
    buildTdWithInfo(book.volumeInfo.imageLinks.thumbnail, trEl, true);
    bookResultsTable.appendChild(trEl); // append is jQuery
}

// Handles the parameters of title/author/genre/description/bookimg
<<<<<<< HEAD

function handleData(data){
        const bookResultsTable = document.getElementById('book-search-results');
        const bookInfo = data.items;
        function buildRow(book){
            const shortDescription = book.volumeInfo.description?.split('.')[0];
            const trEl = document.createElement('tr');
            trEl.classList.add('book-info-row');
            buildTdWithInfo(book.volumeInfo.title, trEl); 
            buildTdWithInfo(book.volumeInfo.authors, trEl);
            buildTdWithInfo(book.volumeInfo.categories, trEl);
            buildTdWithInfo(shortDescription, trEl);
            buildTdWithInfo(book.volumeInfo.imageLinks.thumbnail, trEl, true);
            bookResultsTable.append(trEl)
        }
        for (let i = 0; i < bookInfo.length; i++) {
            buildRow(bookInfo[i])
        }
=======
function handleData(data) {
    // let bookResultsTable = document.getElementById('book-search-results');
    const bookInfo = data.items;
    // function buildRow(book){
    //     const shortDescription = book.volumeInfo.description.split('.')[0];
    //     let trEl = document.createElement('tr');
    //     trEl.classList.add('book-info-row');
    //     buildTdWithInfo(book.volumeInfo.title, trEl);
    //     buildTdWithInfo(book.volumeInfo.authors, trEl);
    //     buildTdWithInfo(book.volumeInfo.categories, trEl);
    //     buildTdWithInfo(shortDescription, trEl);
    //     buildTdWithInfo(book.volumeInfo.imageLinks.thumbnail, trEl, true);
    //     bookResultsTable.appendChild(trEl); // append is jQuery
    // }

    for (let i = 0; i < bookInfo.length; i++) {
        buildRow(bookInfo[i]);
    }
>>>>>>> main
}

function buildTdWithInfo(info, trEl, isImage) {
    const tdEl = document.createElement('td');
    tdEl.classList.add('book-td');
<<<<<<< HEAD
    if (info === undefined){
        tdEl.textContent = 'No info listed.'
    } else if(!isImage) {
        // console.log('info is: ', info);
=======
    if (!info) {
        tdEl.textContent = 'No info listed.'
    } else if (!isImage) {
        console.log('info is: ', info);
>>>>>>> main
        tdEl.textContent = info;
    } else {
        // console.log('we should see this rarely!');
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', info);
        tdEl.append(imgEl);
    }
    trEl.append(tdEl);
<<<<<<< HEAD
}
=======
};
>>>>>>> main

//  Could be function to add book to personal library----->
// bookImgEl.addEventListener('click', handleImageClick);

function handleImageClick(event) {
    const el = event.target;
<<<<<<< HEAD
    if(el.tagName === 'tr'){
        saveBook();
    }
}


// --------------------------- Book log ---------------------------

const libraryArr = [];

function saveBook(){
    // const test = document.
    const bookInputEl = document.getElementById("bookInput").value;
    localStorage.setItem("bookStorage", bookInputEl);
    libraryArr.push(bookInputEl);
    savedBooks();
    updateHTML();
};

function savedBooks(){
    const savedBookEl = document.getElementById("bookLibrary");
    const postLibraryArr = libraryArr.join(`, `);
    savedBookEl.textContent = `${postLibraryArr}`;
};

function updateHTML(){
    const bookEl = getBook();
    document.getElementById("submitReturn").style = "Color: grey";
    document.getElementById("submitReturn").innerHTML = `${bookEl} has been added!`;
    // Add fade out
};

function getBook(){
    return localStorage.getItem("bookStorage");
=======
    if (el.tagName === 'IMG') {
        // insert local storage
    }
>>>>>>> main
};
// <---------------

//---------- Carousel-------------// 

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
};

function currentSlide(n) {
  showSlides(slideIndex = n);
};

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  console.log(slides);
  var dots = document.getElementsByClassName("dot");
  console.log(dots);
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; // These are not calling anything
  dots[slideIndex-1].className += " active";
};

// --------------------------- Add to local storage ---------------------------

function saveBook() {
    const bookInputVal = document.getElementById("bookInput").value;
    console.log(libraryArr);
    libraryArr.push(bookInputVal);
    localStorage.setItem("bookStorage", libraryArr);
    savedBooks();
    updateHTML();
};

function savedBooks() {
    const savedBookEl = document.getElementById("bookLibrary");
    const postLibraryArr = libraryArr.join(`, `);
    savedBookEl.textContent = `${postLibraryArr}`;
};

function updateHTML() {
    const bookEl = getBook();
    // console.log(bookEl)
    document.getElementById("submitReturn").style = "Color: grey";
    document.getElementById("submitReturn").innerHTML = `${bookEl} has been added!`;
    $(document).ready(function(){
        $(`${bookEl}`).fadeOut();
    });
};

function getBook() {
    console.log(localStorage.getItem("bookStorage"));
    return localStorage.getItem("bookStorage");
};

// --------------------------- Remove from local storage ---------------------------

const removeEl = document.getElementById('delete');

// removeEl.addEventListener('click', removeBook());

// function removeBook(){
//     libraryArr.remove(bookInputEl);
// };

// --------------------------- Due date reminder ---------------------------

const lentBookExample = {
    BookTitle: "Candide",
    Author: "AuthorName",
    Genre: "GenreName",
    ReadUnread: "ReadOrNot",
    LoanStatus: "Loaned",
    DueDate: "Tomorrow",
    LoanedTo: "Crindy",
    RemoveEdit: "Delete me"
};

const lentBooks = ["Leviathan", "Candide", "War & Peace"];

const dueDateRowEl = document.querySelector("#resultsDue");

function dueDateReminder() {
    const dueDateEl = document.querySelector("#dueDates");
    lentBooks.push(dueDateEl);
    for (let i = 0; i < lentBooks.length; i++) {
        // const element = array[i];
        if (lentBooks.length <= 0) {
            dueDateEl.textContent = "No upcoming due dates!";
        } else {
            // array.forEach(item => console.log(item));
            // lentBooks.forEach(item => console.log(item));

            // lentBooks.forEach(function, dueDateRowEl);
            // dueDateEl.textContent = `${dueDateEl} is due on ${dueDateEl}`;
        };
    };
};

window.onload = function () {
    dueDateReminder();
};

// --------------------------------------------------------------------------------