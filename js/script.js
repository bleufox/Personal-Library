// Log books in a personal library

// console.log("Enter a book");

// const userBook = [];

// localStorage.setItem();

// console.log(userBook);

// function getBook() {
//     return localStorage.getItem("bookStorage");
// };

// function updateHTML() {
//     const bookEl = getBook();
//     document.getElementById("submitReturn").innerHTML = bookEl + " has been added!";
//     document.getElementById("savedBook").innerHTML = bookEl;
// };

// function saveBook() {
//     // Gets input value
//     var bookInputEl = document.getElementById("bookInput").value;
  
//     // Saves data to retrieve later
//     localStorage.setItem("bookStorage", bookInputEl);
    
//     // Updates HTML
//     updateHTML();
// };

function getName() {
    return localStorage.getItem("userName");
  }
  
function updateHTML() {
    const name = getName();
    document.getElementById("greeting").innerHTML = "Hello, " + name + "! Welcome!";
    document.getElementById("storedName").innerHTML = name;
}

function myFunction() {
    // Gets input value
    const name = document.getElementById("myInput").value;

    // Saves data to retrieve later
    localStorage.setItem("userName", name);

    // Updates HTML
    updateHTML();
}