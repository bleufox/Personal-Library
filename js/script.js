const searchBarAPI = "https://www.googleapis.com/books/v1/volumes?q={author/title/etc}"

function getAPI(){
    fetch(searchBarAPI)
    .then(function (response){
        return response.json()
    })
    .then(function (data){
        console.log(data)
    })
}
getAPI();



// --------------------------------------------------------------------------------
// Book log function - log books in a personal library

// Code adapted from: https://stackoverflow.com/questions/52505323/save-input-value-to-local-storage-and-retrieve-it-on-a-different-page
function getBook(){
    return localStorage.getItem("bookStorage");
};

function updateHTML(){
    const bookEl = getBook();
    document.getElementById("submitReturn").style = "Color: grey";
    document.getElementById("submitReturn").innerHTML = bookEl + " has been added!";
    // document.getElementById("savedBook").innerHTML = bookEl;
};

function saveBook(){
    // Gets input value
    const bookInputEl = document.getElementById("bookInput").value;
  
    // Saves data to retrieve later
    localStorage.setItem("bookStorage", bookInputEl);

    // Updates HTML
    updateHTML();

    console.log(`In this array: ${bookInputEl}`);
};

// function savedBooks(){

// };

// --------------------------------------------------------------------------------