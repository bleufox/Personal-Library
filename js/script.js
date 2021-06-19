const searchInputEl = document.getElementById('bookInput');
const submitBtn = document.getElementById('submitButton');
const titleEl = document.getElementById('resultsTitle');
const authorEl = document.getElementById('resultsAuthor');
const genreEl = document.getElementById('resultsGenre');
const descriptionEl = document.getElementById('resultsDescrip');
const bookImgEl = document.getElementById('resultsImg');
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


// Handles the parameters of title/author/genre/description/bookimg
function handleData(data){
        const bookInfo = data.items;
        // console.log('data array: ' + data)
        // console.log(bookInfo)
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
    // console.log(book)
    if (title === undefined){
        titleEl.textContent = 'No title listed.'
    } else {
        const listEl = document.createElement('ul');
        const listItem = document.createElement('li');
        titleEl.appendChild(listEl)
        listItem.innerHTML = title;
        listEl.appendChild(listItem);
        // console.log('title is: ' + title);
        const addBtn = document.createElement('button')
        // addBtn.setAttribute("style", "color: white; padding: 5px;")
        listItem.append(addBtn)
    //    selectBtn(book);
    }
}

// function selectBtn(selection){
//     const addBtn = document.createElement('button')
//     addBtn.setAttribute("style", "color: white; padding: 5px; margin-left: 35px;")
//     listEl.append(addBtn)
// }

function handleAuthor(book){
    const author = book.volumeInfo.authors;
    if (author === undefined){
        authorEl.textContent = 'No author listed.'
    } else {
        const listEl = document.createElement('ul');
        const listItem = document.createElement('li');
        authorEl.appendChild(listEl);
        listEl.appendChild(listItem);
        listItem.innerHTML = author;
        // console.log('author is: ' + author);
    }
}

function handleGenre(book){
    const genre = book.volumeInfo.categories;
    if (genre === undefined){
        genreEl.textContent = 'No genre listed.';
        console.log('no genre')
    } else{
        const listEl = document.createElement('ul');
        const listItem = document.createElement('li');
        genreEl.appendChild(listEl);
        listEl.appendChild(listItem);
        listItem.innerHTML = genre;
        // console.log('genre is: ' + genre);
    }
}

function handleDescription(book){
    const description = book.volumeInfo.description;
    if (description === undefined){
        console.log('no description');
        descriptionEl.textContent = 'No description listed.'
    } else {
        const descripSnippet = description.split('.');
        // descriptionEl.textContent = descripSnippet[0] + '.';
        const listEl = document.createElement('ul');
        const listItem = document.createElement('li');
        descriptionEl.appendChild(listEl);
        listEl.appendChild(listItem);
        listItem.innerHTML = descripSnippet[0] + '.';
        console.log('description is:' + description);
    }
}

function handleImg(book){
    const bookImg = book.volumeInfo.imageLinks.thumbnail;
    if (bookImg === undefined){
        bookImgEl.textContent = 'No image available.'
        console.log('no image')
    }else {
        const listEl = document.createElement('ul');
        const listItem = document.createElement('li');
        const imageListItem = document.createElement('img');
        bookImgEl.appendChild(listEl);
        listEl.appendChild(listItem);
        listItem.appendChild(imageListItem);
        imageListItem.setAttribute('src', bookImg);
        console.log('image link is:' + bookImg);
    }
}
//  Could be function to add book to personal library----->
bookImgEl.addEventListener('click', handleImageClick);

function handleImageClick(event){
    const el = event.target;
    if(el.tagName === 'IMG'){
        // insert local storage
    }
}
// <---------------

// --------------------------------------------------------------------------------
// Book log function - log books in a personal library

const libraryArr = [];

function saveBook(){
    const bookInputEl = document.getElementById("bookInput").value;
    localStorage.setItem("bookStorage", bookInputEl);
    libraryArr.push(bookInputEl);
    updateHTML();
    savedBooks();
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
};

// --------------------------------------------------------------------------------

const lentBooks = [];
const dueDateRowEl = document.querySelector("resultsDue");

function dueDateReminder(){
    const dueDateEl = document.querySelector("#dueDates");
    
    for (let i = 0; i < lentBooks.length; i++) {
        // const element = array[i];
        if(lentBooks.length <= 0){
            dueDateEl.textContent = "No upcoming due dates!";
        }else{
            dueDateEl.textContent = `${dueDateEl} is due on ${dueDateEl}`;
        };        
    };
};

// window.onload = function(){
//     dueDateReminder();
// };

// --------------------------------------------------------------------------------