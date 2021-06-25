const searchInputEl = document.getElementById('bookInput');
const submitBtn = document.getElementById('submitButton');

const clearArr = [];
let libraryArr = [];
let bookRowArr = [];

function setArrayToLocalStorage(){
    if(libraryArr.length = 0){
        console.log('Array is empty');
    } else{
        return localStorage.getItem('bookStorage');
    };
    console.log('Test');
};

setArrayToLocalStorage();


// -------------- Fetches the API data based on user's query search --------------

function getAPI(bookSearch){
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookSearch}`)
        .then(function (response){
            return response.json()
        })
        .then(function (data){
            handleData(data);
        });
};

// -------------- Event listener input's user's query into the API fetch function --------------

submitBtn.addEventListener('click', handleClick);

function handleClick(){
    const userQuery = searchInputEl.value;
    getAPI(userQuery);
};

// -------------- Handles defined data parameters from API fetch, to be added to local storage --------------

function handleData(data){
    // if (condition) {
    //     function removeAll(){
    //         // const elem = document.getElementById('book-search-results');
    //         // elem.parentNode.removeChild(elem);
    //         document.getElementById('bookInput').value = '';
    //         document.getElementById('book-search-results > tbody').innerHTML = ''; // This is clearing too much
    //         // document.querySelector('#book-search-results > tbody').innerHTML = '';
    //         // console.log(document.getElementById('submitReturn'));
    //         document.getElementById('submitReturn').innerHTML = '';
    //         libraryArr = clearArr;
    //         bookRowArr = clearArr;
    //     };

    //     let bookResultsTable = document.querySelector('#book-search-results');
    //     // console.log(bookResultsTable);
    //     const bookInfo = data.items;
    //     function buildRow(book){
    //         const shortDescription = book.volumeInfo.description?.split('.')[0];
    //         let trEl = document.createElement('tr');
    //         trEl.classList.add('book-info-row');
    //         buildTdWithInfo(book.volumeInfo.title, trEl); 
    //         buildTdWithInfo(book.volumeInfo.authors, trEl);
    //         buildTdWithInfo(book.volumeInfo.categories, trEl);
    //         buildTdWithInfo(shortDescription, trEl);
    //         // console.log(book.volumeInfo.imageLinks.thumbnail, trEl, true);
    //         buildTdWithInfo(book.volumeInfo.imageLinks.thumbnail, trEl, true);
    //         // console.log(bookResultsTable);
    //         bookResultsTable.append(trEl);
    //     };
    let bookResultsTable = document.querySelector('#book-search-results');
    // console.log(bookResultsTable);
    const bookInfo = data.items;
    function buildRow(book){
        const shortDescription = book.volumeInfo.description?.split('.')[0];
        let trEl = document.createElement('tr');
        trEl.classList.add('book-info-row');
        buildTdWithInfo(book.volumeInfo.title, trEl); 
        buildTdWithInfo(book.volumeInfo.authors, trEl);
        buildTdWithInfo(book.volumeInfo.categories, trEl);
        buildTdWithInfo(shortDescription, trEl);
        // console.log(book.volumeInfo.imageLinks.thumbnail, trEl, true);
        buildTdWithInfo(book.volumeInfo.imageLinks.thumbnail, trEl, true);
        // console.log(bookResultsTable);
        bookResultsTable.append(trEl);
    }
    for (let i = 0; i < bookInfo.length; i++){
        buildRow(bookInfo[i]);
    }       
};

// -------------- Builds table to display handleData parameters --------------

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

// --------------- Event listener to select the table row based on user's click ---------------

const bookSelection = document.querySelector('#book-search-results');
bookSelection.addEventListener('click', handleClickSelection);

// --------------- Handles user's click selection ---------------
// (Function recieves the <td> target tag, identifies the <tr> parent element and then selects the first 3 objects of the parent element array to generate the items being placed in personal library list)

function handleClickSelection(event){
    const el = event.target;
    if(el.tagName === 'TD'){
        const bookRow = el.parentElement;
        const bookInfo = {
            title: bookRow.children[0].innerText,
            author: bookRow.children[1].innerText,
            genre: bookRow.children[2].innerText,
        };
        document.querySelector('#resultsBtn');
        // console.log('bookinfo: ', bookInfo)
        saveBook(bookInfo);   
    };
}

// ============= I don't think this is being called anywhere, lets remove it if we aren't using it? ================
// function browseLibrary(){
//     const searchVal = document.getElementById('bookInput').value;
//     savedLibraryArr.push(searchVal);
//     localStorage.setItem('searchStorage', savedLibraryArr);
//     console.log(bookRowArr[0]);
//     updateHTML(bookRowArr[0]);
// };
// =================================================================================================================

// --------------- Saves bookInfo from handleSelection function to local storage ---------------

function saveBook(bookInfo){
    if (!bookInfo)
        return;
    let bookStorage = localStorage.getItem('bookStorage') || '[]';
    // console.log("this is testing bookStorage inside of savebook before setItem ", bookStorage)
    bookStorage = JSON.parse(bookStorage);
    bookStorage.push(bookInfo);
    localStorage.setItem('bookStorage', JSON.stringify(bookStorage));
    console.log("this is testing bookStorage inside of savebook after setItem ", bookStorage)
    addToLibrary();
};

// --------------- Retrieves bookInfo from local storage to add to Personal Library Page and builds Personal Library table ---------------

function addToLibrary(){
    let libraryTable = document.getElementById('usersBooks');
    function buildPersonalLibrary(){
        let bookStorage = localStorage.getItem('bookStorage') || '[]';
        bookStorage = JSON.parse(bookStorage);
        for (let i = 0; i < bookStorage.length; i++){
            // ------- if you view bookStorage in the console, you will see that all items are getting added to the bookstorage array which saves them to localstorage, if we don't target the last element in the bookStorage array it will continue to append the full list to the page plus the most recently added book.
            console.log('bookStorage: ', bookStorage)
            i = bookStorage.length - 1;
            console.log(i)
            // Next we need to identify how to append the full bookStorage on loading the page---------------------------
            let bookStorageEntry = bookStorage[i]
            console.log('bookstorageentry: ', bookStorageEntry)
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

// ============= Not sure if this is going to be used in the future? If not lets delete ===============================

// function updateHTML(){
//     const bookEl = bookRowArr[0];
//     const submitReturnEl = document.getElementById('submitReturn');
//     if(!bookEl){
//         console.log("Ain't nothing here")
//     }else{
//     // // console.log(bookEl);
//     // while (bookEl.firstChild) {
//     //     bookEl.removeChild(bookEl.firstChild)
//     // };
//     // console.log('TEST')
//     // document.getElementById('submitReturn').innerHTML = 'TEST';
//     submitReturnEl.style = 'color: grey';
//     submitReturnEl.innerHTML = `${bookEl} has been added!`;
//     // if (submitReturnEl.className.indexOf('hide') !== -1){
//     //   fadeIn(img);
//     //   this.innerHTML = 'Fade Out';
//     // }
//     // else{
//     //   fadeOut(img);
//     //   this.innerHTML = 'Fade In';    
//     };
// };

// =========================================================================================================

function fadeOut(el){
    el.classList.add('hide');
    el.classList.remove('show');
};

// --------------- Remove from Local Storage ---------------

const removeEl = document.getElementById('delete');

// removeEl.addEventListener('click', removeBook());

// function removeBook(){
//     libraryArr.remove(bookInputEl);
// };

// --------------- Due date reminder ---------------

const lentBooks = ['Leviathan', 'Candide', 'War & Peace'];

const dueDateRowEl = document.querySelector('#resultsDue');

function dueDateReminder(){
    const dueDateEl = document.querySelector('#dueDates');
    lentBooks.push(dueDateEl);
    for (let i = 0; i < lentBooks.length; i++){
        // const element = array[i];
        if (lentBooks.length <= 0){
            dueDateEl.textContent = 'No upcoming due dates!';
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

// --------------- Clears Search Results ---------------

// function removeAll(){
//     // const elem = document.getElementById('book-search-results');
//     // elem.parentNode.removeChild(elem);
//     document.getElementById('bookInput').value = '';
//     document.getElementById('book-search-results > tbody').innerHTML = ''; // This is clearing too much
//     // document.querySelector('#book-search-results > tbody').innerHTML = '';
//     // console.log(document.getElementById('submitReturn'));
//     document.getElementById('submitReturn').innerHTML = '';
//     libraryArr = clearArr;
//     bookRowArr = clearArr;
// };


