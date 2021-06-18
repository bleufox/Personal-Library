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


// Handles the parameters
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
    }
}


// function handleData(data){
//     const bookInfo = data.items;
//     console.log(bookInfo)
//         function handleTitle(){
//             for (let i = 0; i < bookInfo.length; i++){
//                 const title = bookInfo[i].volumeInfo.title;
//                 console.log(title)
//                 titleEl.textContent = title
//                 // let titleArr = {};
//                 // const test = title.map(x => titleArr[x]);
//                 // title.forEach(value =>{
//                 //     if(!title.includes(value)){
//                 //         titleArr.push(value);
//                 //     }
//                 // });
//                 // console.log(titleArr)
//                 // if(title){
//                 //   titleEl.textContent = title;  
//                 // } else return  
//             }
//         } 
//         function handleAuthor(){
//             for (let i = 0; i < bookInfo.length; i++){
//                 const authors = bookInfo[i].volumeInfo.authors[0];
//                 authorEl.textContent = authors;
//             }
            
//         }
//         function handleGenre(){
//             for (let i = 0; i < bookInfo.length; i++){
//                 const genre = bookInfo[i].volumeInfo.categories; 
//                 genreEl.textContent = genre;  
//             }
            
//         }
//         // function handleDescription(){
//         //     for (let i = 0; i < bookInfo.length; i++){
//         //         const description = bookInfo[i].volumeInfo.description;
//         //         const descripSnippet = description.split('.');
//         //         descriptionEl.textContent = descripSnippet[0] + '.';
//         //     }
            
//         // }
//         function handleImg(){
//             for (let i = 0; i < bookInfo.length; i++){
//                 const bookImg = bookInfo[i].volumeInfo.imageLinks.thumbnail;
//             bookImgEl.setAttribute('src', bookImg)
//             }
//         }
//    handleTitle(); 
//    handleAuthor();
//    handleGenre();
// //    handleDescription();
//    handleImg();
// }

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
    document.getElementById("submitReturn").innerHTML = bookEl + " has been added!";
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
    
    function updateHTML(){
        libraryArr.push(bookInputEl);
        console.log(`In this array: ${libraryArr}`);
        savedBooks()
    };

};


    


function savedBooks(){
    const savedBookEl = document.getElementById("bookLibrary");    
    const PostLibraryArr = libraryArr.join(`, `);
    savedBookEl.textContent = `${PostLibraryArr}`;
};

// --------------------------------------------------------------------------------