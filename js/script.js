const searchInputEl = document.getElementById('bookInput');
const submitBtn = document.getElementById('submitButton');
const titleEl = document.getElementById('resultsTitle');
const authorEl = document.getElementById('resultsAuthor');
const genreEl = document.getElementById('resultsGenre');
const descriptionEl = document.getElementById('resultsDescrip');
const bookImgEl = document.getElementById('resultsImg');
// document.body.append(titleEl);
// document.body.append(authorEl);
// document.body.append(genreEl);
// document.body.append(descriptionEl);
// document.body.append(bookImgEl);

const titleArr = [];
const imgArr = []
console.log(titleArr)
console.log(imgArr)

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
        const bookResultsTable = document.getElementById('book-search-results');
        const bookInfo = data.items;
        function buildRow(book){
            const shortDescription = book.volumeInfo.description.split('.')[0];
            const trEl = document.createElement('tr');
            trEl.classList.add('book-info-row');
            buildTdWithInfo(book.volumeInfo.title, trEl); 
            buildTdWithInfo(book.volumeInfo.authors, trEl);
            buildTdWithInfo(book.volumeInfo.categories, trEl);
            buildTdWithInfo(shortDescription, trEl);
            buildTdWithInfo(book.volumeInfo.imageLinks.thumbnail, trEl, true);
            bookResultsTable.append(trEl)
        }

<<<<<<< HEAD
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
        titleArr.push(title);
    }

=======
        for (let i = 0; i < bookInfo.length; i++) {
            buildRow(bookInfo[i])
        }
>>>>>>> main
}

function buildTdWithInfo(info, trEl, isImage){
    const tdEl = document.createElement('td');
    tdEl.classList.add('book-td');
    if (!info){
        tdEl.textContent = 'No info listed.'
    } else if(!isImage) {
        console.log('info is: ', info);
        tdEl.textContent = info;
    } else {
        console.log('we should see this rarely!');
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', info);
        tdEl.append(imgEl);
    }
    trEl.append(tdEl);
}

<<<<<<< HEAD
function handleGenre(book){
    const genre = book.volumeInfo.categories;
    if (genre === undefined){
        genreEl.textContent = 'No genre listed.';
        // console.log('no genre')
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
        // console.log('description is:' + description);
    }
}

function handleImg(book){
    const bookImg = book.volumeInfo.imageLinks.thumbnail;
    if (bookImg === undefined){
        bookImgEl.textContent = 'No image available.'
        // console.log('no image')
    }else {
        const listEl = document.createElement('ul');
        const listItem = document.createElement('li');
        const imageListItem = document.createElement('img');
        bookImgEl.appendChild(listEl);
        listEl.appendChild(listItem);
        listItem.appendChild(imageListItem);
        imageListItem.setAttribute('src', bookImg);
        // console.log('image link is:' + bookImg);
        imgArr.push(bookImg)
    }
}
=======

>>>>>>> main
//  Could be function to add book to personal library----->
bookImgEl.addEventListener('click', handleImageClick);

function handleImageClick(event){
    const el = event.target;
    if(el === imgArr[0]){
        console.log(titleArr[0])
        // saveBook();
        // updateHTML();
        // insert local storage
    }
}
// <---------------

// --------------------------- Book log ---------------------------

const libraryArr = [];

function saveBook(){
    const bookInputEl = document.getElementById("bookInput").value;
    localStorage.setItem("bookStorage", bookInputEl);
    libraryArr.push(bookInputEl);
    savedBooks();
    updateHTML();
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

//---------- Carousel-------------// 
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}


// --------------------------- Due date reminder ---------------------------

const lentBooks = [];
const dueDateRowEl = document.querySelector("resultsDue");

function dueDateReminder(){
    const dueDateEl = document.querySelector("#dueDates");
    lentBooks.push(dueDateEl);
    
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