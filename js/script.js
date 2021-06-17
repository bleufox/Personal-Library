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
function getAPI(bookSearch){
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookSearch}`)
    .then(function (response){
        return response.json()
    })
    .then(handleData);
}

submitBtn.addEventListener('click', handleClick)
function handleClick(){
    const userQuery = searchInputEl.value;
    getAPI(userQuery);
}

// pulls data from 10 results based on desired parameters
function handleData(data){
    const bookInfo = data.items;
    console.log(bookInfo)
    for (let i = 0; i < bookInfo.length; i++) {
        const title = bookInfo[i].volumeInfo.title;
        const authors = bookInfo[i].volumeInfo.authors[0];
        const genre = bookInfo[i].volumeInfo.categories;
        const description = bookInfo[i].volumeInfo.description;
        const bookImg = bookInfo[i].volumeInfo.imageLinks.thumbnail;
        // !!--appends book image to page BUT looks like it stacks all 10 images and/or defaults to last image in the array to append..EEK! might needs hlep figuring that one out
        bookImgEl.setAttribute('src', bookImg)
        //--!!
    }
}

// --------------------------------------------------------------------------------
// Book log function - log books in a personal library

const libraryArr = [];

// Code adapted from: https://stackoverflow.com/questions/52505323/save-input-value-to-local-storage-and-retrieve-it-on-a-different-page
function getBook(){
    console.log(localStorage.getItem("bookStorage"));
    return localStorage.getItem("bookStorage");
};

function updateHTML(){
    const bookEl = getBook();
    document.getElementById("submitReturn").style = "Color: grey";
    document.getElementById("submitReturn").innerHTML = `${bookEl} has been added!`;
    // Add fade out effect?
};

function saveBook(){
    // Gets input value
    const bookInputEl = document.getElementById("bookInput").value;
    // Saves data to retrieve later
    localStorage.setItem("bookStorage", bookInputEl);
    updateHTML();
    libraryArr.push(bookInputEl);
    console.log(`In this array: ${libraryArr}`);
    savedBooks()
};

function savedBooks(){
    const savedBookEl = document.getElementById("bookLibrary");    
    const PostLibraryArr = libraryArr.join(`, `);
    savedBookEl.textContent = `${PostLibraryArr}`;
};

// --------------------------------------------------------------------------------