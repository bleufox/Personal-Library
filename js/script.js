const searchInputEl = document.getElementById('bookInput');
const submitBtn = document.getElementById('submitButton');
const titleEl = document.createElement('div');
const authorEl = document.createElement('div');
const genreEl = document.createElement('div');
const descriptionEl = document.createElement('p');
const bookImgEl = document.createElement('img');
document.body.append(titleEl);
document.body.append(authorEl);
document.body.append(genreEl);
document.body.append(descriptionEl);
document.body.append(bookImgEl);

// Searches the api using user's query and gives top 10 results
function getAPI(bookSearch) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookSearch}`)
        .then(function (response) {
            return response.json()
        })
        .then(handleData);
}

submitBtn.addEventListener('click', handleClick)
function handleClick() {
    const userQuery = searchInputEl.value;
    getAPI(userQuery);
}

<<<<<<< HEAD

// Handles the parameters of title/author/genre/description/bookimg
function handleData(data){
        const bookInfo = data.items;
        console.log('data array is:', data)
        for (let i = 0; i < bookInfo.length; i++) {
            handleTitle(bookInfo[i]); 
            handleAuthor(bookInfo[i]);
            handleGenre(bookInfo[i]);
            handleDescription(bookInfo[i]);
            handleImg(bookInfo[i]);
        }
}

function handleTitle(book){
    const title = book.volumeInfo.title;
    if (title === undefined){
        titleEl.textContent = 'No title listed.'
    } else {
        titleEl.textContent = title;
        console.log('title is:' + title);
    }
}

function handleAuthor(book){
    const author = book.volumeInfo.authors;
    if (author === undefined){
        authorEl.textContent = 'No author listed.'
    } else {
        authorEl.textContent = author;
        console.log('author is:' + author);
    }
}

function handleGenre(book){
    const genre = book.volumeInfo.categories;
    if (genre === undefined){
        genreEl.textContent = 'No genre listed.';
        console.log('no genre')
    } else{
        genreEl.textContent = genre;
        console.log('genre is:' + genre);
    }
}

function handleDescription(book){
    const description = book.volumeInfo.description;
    if (description === undefined){
        console.log('no description');
        descriptionEl.textContent = 'No description listed.'
    } else {
        const descripSnippet = description.split('.');
        descriptionEl.textContent = descripSnippet[0] + '.';
        console.log('description is:' + description);
    }
}

function handleImg(book){
    const bookImg = book.volumeInfo.imageLinks.thumbnail;
    if (bookImg === undefined){
        bookImgEl.textContent = 'No image available.'
        console.log('no image')
    }else {
        bookImgEl.setAttribute('src', bookImg);
        console.log('image link is:' + bookImg);
=======
// pulls data from 10 results based on desired parameters
function handleData(data) {
    const bookInfo = data.items;
    console.log(bookInfo)
    for (let i = 0; i < bookInfo.length; i++) {
        const title = bookInfo[i].volumeInfo.title;
        // const authors = bookInfo[i].volumeInfo.authors[0];
        const genre = bookInfo[i].volumeInfo.categories;
        const description = bookInfo[i].volumeInfo.description;
        const bookImg = bookInfo[i].volumeInfo.imageLinks.thumbnail;
        // !!--appends book image to page BUT looks like it stacks all 10 images and/or defaults to last image in the array to append..EEK! might needs hlep figuring that one out
        bookImgEl.setAttribute('src', bookImg)
        //--!!
>>>>>>> main
    }
}

// --------------------------------------------------------------------------------
// Book log function - log books in a personal library

const libraryArr = [];

function getBook(){
    // console.log(localStorage.getItem("bookStorage"));
    return localStorage.getItem("bookStorage");
};

function updateHTML() {
    const bookEl = getBook();
    document.getElementById("submitReturn").style = "Color: grey";
    document.getElementById("submitReturn").innerHTML = `${bookEl} has been added!`;
    // Add fade out
};

function saveBook() {
    // Gets input value
    const bookInputEl = document.getElementById("bookInput").value;
    // Saves data to retrieve later
    localStorage.setItem("bookStorage", bookInputEl);
<<<<<<< HEAD

    updateHTML();

    libraryArr.push(bookInputEl);
     
    console.log(`In this array: ${libraryArr}`);

    savedBooks()
    
    function updateHTML(){
        libraryArr.push(bookInputEl);
        console.log(`In this array: ${libraryArr}`);
        savedBooks()
    };

=======
    updateHTML();
    libraryArr.push(bookInputEl);
    // console.log(`In this array: ${libraryArr}`);
    savedBooks();
>>>>>>> main
};


    


function savedBooks(){
    const savedBookEl = document.getElementById("bookLibrary");    
    const postLibraryArr = libraryArr.join(`, `);
    savedBookEl.textContent = `${postLibraryArr}`;
};

// --------------------------------------------------------------------------------

const lentBooks = [];
const dueDateRowEl = document.querySelector("rowResults");

document.querySelector

function dueDateReminder(){
    const dueDateEl = document.querySelector("#dueDates");
    
    for (let i = 0; i < lentBooks.length; i++) {
        // const element = array[i];
        if(lentBooks.length <= 0){
            dueDateEl.textContent = "Hooray! No upcoming due dates!";
        }else{
            dueDateEl.textContent = `${dueDateEl} is due on ${dueDateEl}`;
        };        
    };
};

// dueDateReminder();

// --------------------------------------------------------------------------------