const searchInputEl = document.getElementById('bookInput');
const submitBtn = document.getElementById('submitButton');
const titleEl = document.getElementById('resultsTitle');
const authorEl = document.getElementById('resultsAuthor');
const genreEl = document.getElementById('resultsGenre');
const descriptionEl = document.getElementById('resultsDescrip');
const bookImgEl = document.getElementById('resultsImg');
let libraryArr = [];

console.log("Does this work?");

function setArrayToLocalStorage(){
    if(libraryArr.length = 0){
        console.log("Array is empty");
    } else{
        return localStorage.getItem("bookStorage");
    };
    console.log("Test");
};

setArrayToLocalStorage();

// -------- Searches the API Using User's Query and Gives Top 10 Results --------

function getAPI(bookSearch){
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookSearch}`)
        .then(function (response){
            return response.json()
        })
        .then(function (data){
            // console.log(data.items)
            handleData(data);
        });
};

submitBtn.addEventListener('click', handleClick);

function handleClick(){
    const userQuery = searchInputEl.value;
    getAPI(userQuery);
};

// -------- Handles the Parameters of Title/Author/Genre/Description/BookImg --------

function handleData(data){
        // let bookResultsTable = document.getElementById('book-search-results');
        let bookResultsTable = document.querySelector('#book-search-results');
        console.log(bookResultsTable);
        const bookInfo = data.items;
        function buildRow(book){
            const shortDescription = book.volumeInfo.description?.split('.')[0];
            let trEl = document.createElement('tr');
            trEl.classList.add('book-info-row');
            buildTdWithInfo(book.volumeInfo.title, trEl); 
            buildTdWithInfo(book.volumeInfo.authors, trEl);
            buildTdWithInfo(book.volumeInfo.categories, trEl);
            buildTdWithInfo(shortDescription, trEl);
            console.log(book.volumeInfo.imageLinks.thumbnail, trEl, true);
            buildTdWithInfo(book.volumeInfo.imageLinks.thumbnail, trEl, true);
            console.log(bookResultsTable);
            bookResultsTable.append(trEl);
        };
        for (let i = 0; i < bookInfo.length; i++){
            buildRow(bookInfo[i]);
        };
};

// -------- Builds Table with handleData Info --------

function buildTdWithInfo(info, trEl, isImage) {
    const tdEl = document.createElement('td');
    tdEl.classList.add('book-td');
    if (!info){
        tdEl.textContent = 'No info listed.';
    } else if (!isImage){
        // console.log('info is: ', info);
        tdEl.textContent = info;
    } else{
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', info);
        tdEl.append(imgEl);
    }
    trEl.append(tdEl);
};

// -------- Click Event to Select the Book/Row from Query Search --------

const bookSelection = document.querySelector('#book-search-results');
bookSelection.addEventListener('click', handleClickSelection);

let bookRowArr = [];

function handleClickSelection(event){
    const el = event.target;
    if(el.tagName === 'TD'){
        const bookRow = el.parentElement;
        const bookInfo = {
            title: bookRow.children[0].innerText,
            author: bookRow.children[1].innerText,
            genre: bookRow.children[2].innerText,
            description: bookRow.children[3].innerText,
        };

        saveBook(bookInfo);   
    } else{
        console.log('you did not click on a <td> tag');
    };
};

// --------------------------- Add to Local Storage ---------------------------

function browseLibrary(){
    const searchVal = document.getElementById("bookInput").value;
    savedLibraryArr.push(searchVal);
    localStorage.setItem("searchStorage", savedLibraryArr);
    console.log(bookRowArr[0]);
    updateHTML(bookRowArr[0]);
};

function saveBook(bookInfo){
    if (!bookInfo)
        return;
    let bookStorage = localStorage.getItem("bookStorage") || "[]";
    bookStorage = JSON.parse(bookStorage);
    bookStorage.push(bookInfo);
    localStorage.setItem("bookStorage", JSON.stringify(bookStorage));
};

// -------- Adds Book to Personal Library Page --------

function addToLibrary(){
    let libraryTable = document.getElementById('usersBooks');
    function buildPersonalLibrary(){
        let bookStorage = localStorage.getItem("bookStorage") || "[]";
        bookStorage = JSON.parse(bookStorage);
        for (let i = 0; i < bookStorage.length; i++){
            let bookStorageEntry = bookStorage[i]
            let trEl = document.createElement('tr');
            trEl.classList.add('users-book-row');
            let tdEl = document.createElement('td');
            tdEl.textContent = bookStorageEntry.title;
            trEl.appendChild(tdEl);
            tdEl = document.createElement('td');
            tdEl.textContent = bookStorageEntry.author;
            trEl.appendChild(tdEl);
            tdEl = document.createElement('td');
            tdEl.textContent = bookStorageEntry.genre;
            trEl.appendChild(tdEl);
            libraryTable.append(trEl);
        };
    };
    buildPersonalLibrary();
};

addToLibrary();

function updateHTML(){
    const bookEl = bookRowArr[0];
    const submitReturnEl = document.getElementById("submitReturn");
    if(!bookEl){
        console.log("Ain't nothing here");
    }else{
    // // console.log(bookEl);
    // while (bookEl.firstChild) {
    //     bookEl.removeChild(bookEl.firstChild)
    // };
    // console.log("TEST")
    // document.getElementById("submitReturn").innerHTML = "TEST";
    submitReturnEl.style = "color: grey";
    submitReturnEl.innerHTML = `${bookEl} has been added!`;
    // if (submitReturnEl.className.indexOf('hide') !== -1){
    //   fadeIn(img);
    //   this.innerHTML = 'Fade Out';
    // }
    // else{
    //   fadeOut(img);
    //   this.innerHTML = 'Fade In';    
    };
};

function fadeOut(el){
    el.classList.add('hide');
    el.classList.remove('show');
};

// -------- Carousel --------

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n){
    showSlides(slideIndex += n);
};

function currentSlide(n){
    showSlides(slideIndex = n);
};

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    // console.log(slides);
    var dots = document.getElementsByClassName("dot");
    // console.log(dots);
    if (n > slides.length){ 
        slideIndex = 1 
    };
    if (n < 1){ 
        slideIndex = slides.length 
    };
    for (i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    };
    for (i = 0; i < dots.length; i++){
        dots[i].className = dots[i].className.replace(" act", "");
    };
    slides[slideIndex - 1].style.display = "block"; 
    dots[slideIndex - 1].className += " act";
};

// -------- Remove from Local Storage --------

const removeEl = document.getElementById('delete');

// removeEl.addEventListener('click', removeBook());

// function removeBook(){
//     libraryArr.remove(bookInputEl);
// };

// -------- Due Date Reminder --------

const lentBooks = ["Leviathan", "Candide", "War & Peace"];

const dueDateRowEl = document.querySelector("#resultsDue");

function dueDateReminder(){
    const dueDateEl = document.querySelector("#dueDates");
    lentBooks.push(dueDateEl);
    for (let i = 0; i < lentBooks.length; i++){
        // const element = array[i];
        if (lentBooks.length <= 0){
            dueDateEl.textContent = "No upcoming due dates!";
        } else{
            // array.forEach(item => console.log(item));
            // lentBooks.forEach(item => console.log(item));

            // lentBooks.forEach(function, dueDateRowEl);
            // dueDateEl.textContent = `${dueDateEl} is due on ${dueDateEl}`;
        };
    };
};

window.onload = function (){
    dueDateReminder();
};

// -------- Clears Search Results --------

const clearArr = [];

function removeAll(){
    // document.getElementById("book-search-results").innerHTML = "";
    document.querySelector('#book-search-results > tbody').innerHTML = "";
    document.getElementById("submitReturn").innerHTML = "";
    libraryArr = clearArr;
    bookRowArr = clearArr;
};

// ----------------------------------------------------------------------------