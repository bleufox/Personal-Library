// --------------------------------------------------------------------------------
// Book log function - log books in a personal library

// Code adapted from: https://stackoverflow.com/questions/52505323/save-input-value-to-local-storage-and-retrieve-it-on-a-different-page
function getBook(){
    return localStorage.getItem("bookStorage");
};

function updateHTML(){
    const bookEl = getBook();
    document.getElementById("submitReturn").innerHTML = bookEl + " has been added!";
    // document.getElementById("savedBook").innerHTML = bookEl;
    // console.log(bookEl + " has been added!");
};

const saveBookButton = document.getElementById("submitButton")
saveBookButton.onclick = function saveBook(){
    // Gets input value
    const bookInputEl = document.getElementById("bookInput").value;
  
    // Saves data to retrieve later
    localStorage.setItem("bookStorage", bookInputEl);

    console.log(`In this array: ${bookInputEl}`);
    
    // Updates HTML
    updateHTML();
};

// document.getElementById('demo').onclick = function changeContent() {
//     document.getElementById('demo').textContent = "Help me";
//     document.getElementById('demo').style = "Color: red";
// };

// --------------------------------------------------------------------------------