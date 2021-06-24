const searchInputEl = document.getElementById('bookInput');
const submitBtn = document.getElementById('submitButton');
const titleEl = document.getElementById('resultsTitle');
const authorEl = document.getElementById('resultsAuthor');
const genreEl = document.getElementById('resultsGenre');
const descriptionEl = document.getElementById('resultsDescrip');
const bookImgEl = document.getElementById('resultsImg');
const libraryArr = [];
const savedLibraryArr = [];

function setArrayToLocalStorage (){
    if (libraryArr.length = 0){
        console.log("Array is empty");
    }else{
        return localStorage.getItem("bookStorage");
    }
};

setArrayToLocalStorage();

// -------------------- Searches the api using user's query and gives top 10 results --------------
function getAPI(bookSearch) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookSearch}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data.items)
            handleData(data)
        });
};

submitBtn.addEventListener('click', handleClick)
function handleClick() {
    const userQuery = searchInputEl.value;
    getAPI(userQuery);
};

// -------------- Handles the parameters of title/author/genre/description/bookimg ---------------

function handleData(data){
        let bookResultsTable = document.getElementById('book-search-results');
        const bookInfo = data.items;
        function buildRow(book){
            const shortDescription = book.volumeInfo.description?.split('.')[0];
            let trEl = document.createElement('tr');
            trEl.classList.add('book-info-row');
            buildTdWithInfo(book.volumeInfo.title, trEl); 
            buildTdWithInfo(book.volumeInfo.authors, trEl);
            buildTdWithInfo(book.volumeInfo.categories, trEl);
            buildTdWithInfo(shortDescription, trEl);
            console.log(book.volumeInfo.imageLinks.thumbnail);
            buildTdWithInfo(book.volumeInfo.imageLinks.thumbnail, trEl, true);
            bookResultsTable.append(trEl);
        }
        for (let i = 0; i < bookInfo.length; i++) {
            buildRow(bookInfo[i]);
        }
};

//  ----------------------- Builds table with handleData info -----------------------

function buildTdWithInfo(info, trEl, isImage) {
    const tdEl = document.createElement('td');
    tdEl.classList.add('book-td');
    if (!info) {
        tdEl.textContent = 'No info listed.'
    } else if (!isImage) {
        console.log('info is: ', info);
        tdEl.textContent = info;
    } else {
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', info);
        tdEl.append(imgEl);
        console.log(trEl);
        trEl.append(tdEl);
    }
};

//  ------------ Click event to select the book/row from query search ------------

const bookSelection = document.querySelector('#book-search-results');
bookSelection.addEventListener('click', handleClickSelection);

const bookRowArr = [];

function handleClickSelection(event) {
    const el = event.target;
    if(el.tagName === 'TD'){
        const bookRow = el.parentElement;
        // saveBook(bookRow);
        for(let i = 0; i < 3; i++){
           const bookRowText = bookRow.children[i].innerText;
        //    console.log(bookRowText)
           bookRowArr.push(bookRowText)
        } 
        saveBook();
    } else {
        console.log('you did not click on a <td> tag')
    }
};

// ------------------------ Add to local storage ------------------------

function browseLibrary(){
    const searchVal = document.getElementById("bookInput").value;
    savedLibraryArr.push(searchVal);
    localStorage.setItem("searchStorage", savedLibraryArr);
};

function saveBook(){
    // const bookInputVal = document.getElementById("bookInput").value;
    libraryArr.push(bookRowArr);
    localStorage.setItem("bookStorage", libraryArr);
    // console.log('library array ', libraryArr)
    // console.log('book row array ', bookRowArr[0])
    savedBooks();
    updateHTML(bookRowArr[0]);
    addToLibrary();
};

// ------------------ Adds book to Personal Library Page ------------------

function addToLibrary(){
    function buildPersonalLibrary(){
        const trEl2 = document.createElement('tr');
        trEl2.classList.add('users-book-row');
        createRows(bookRowArr[0], trEl2)
        createRows(bookRowArr[1], trEl2)
        createRows(bookRowArr[2], trEl2)
        // console.log(trEl2);
        // console.log(searchInputEl);
        searchInputEl.append(trEl2);
        // console.log('hi im in the console')
    }
    buildPersonalLibrary();
};

function createRows(rowInfo, trEl2){
    const tdEl2 = document.createElement('td');
    tdEl2.classList.add('users-book-td');
    tdEl2.textContent = rowInfo;
    trEl2.append(tdEl2);
};

function savedBooks(){
    const addedBook = document.createElement("p")
    const totalLibrary = localStorage.getItem("bookStorage");
    // document.getElementById("userLibrary").innerHTML = `${totalLibrary}`;
    addedBook.textContent = `${totalLibrary}`;
};

function updateHTML(item){
    document.getElementById("submitReturn").innerHTML = "TEST";
    document.getElementById("submitReturn").style = "color: grey";
    document.getElementById("submitReturn").innerHTML = `${item} has been added!`;
};

// function getBook() {
//     const addedBook = document.createElement("p")
//     const totalLibrary = localStorage.getItem("bookStorage");
//     addedBook.append(totalLibrary);
//     console.log(addedBook);
//     document.getElementById("userLibrary").innerHTML = `${totalLibrary}`;
//     return totalLibrary;
// };

// --------------------------- Carousel ------------------------------

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
//   console.log(slides);
  var dots = document.getElementsByClassName("dot");
//   console.log(dots);
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
//   slides[slideIndex-1].style.display = "block"; // These are not calling anything
//   dots[slideIndex-1].className += " active";
};

// ----------------------- Remove from local storage -----------------------

const removeEl = document.getElementById('delete');

// removeEl.addEventListener('click', removeBook());

// function removeBook(){
//     libraryArr.remove(bookInputEl);
// };

// --------------------------- Due date reminder ---------------------------

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

// ------------------------ Clears Search Results -----------------------------

function removeAll(){
    document.getElementById("book-search-results").innerHTML = "";
};

// --------------------------------------------------------------------------