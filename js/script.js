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