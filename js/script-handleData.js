
// function selectBtn(selection){
//     const addBtn = document.createElement('button')
//     addBtn.setAttribute("style", "color: white; padding: 5px; margin-left: 35px;")
//     listEl.append(addBtn)
// }

// function handleAuthor(book){
//     const author = book.volumeInfo.authors;
//     if (author === undefined){
//         authorEl.textContent = 'No author listed.'
//     } else {
//         const listEl = document.createElement('ul');
//         const listItem = document.createElement('li');
//         authorEl.appendChild(listEl);
//         listEl.appendChild(listItem);
//         listItem.innerHTML = author;
//         // console.log('author is: ' + author);
//     }
// }

// function handleGenre(book){
//     const genre = book.volumeInfo.categories;
//     if (genre === undefined){
//         genreEl.textContent = 'No genre listed.';
//         console.log('no genre')
//     } else{
//         const listEl = document.createElement('ul');
//         const listItem = document.createElement('li');
//         genreEl.appendChild(listEl);
//         listEl.appendChild(listItem);
//         listItem.innerHTML = genre;
//         // console.log('genre is: ' + genre);
//     }
// }

// function handleDescription(book){
//     const description = book.volumeInfo.description;
//     if (description === undefined){
//         console.log('no description');
//         descriptionEl.textContent = 'No description listed.'
//     } else {
//         const descripSnippet = description.split('.');
//         // descriptionEl.textContent = descripSnippet[0] + '.';
//         const listEl = document.createElement('ul');
//         const listItem = document.createElement('li');
//         descriptionEl.appendChild(listEl);
//         listEl.appendChild(listItem);
//         listItem.innerHTML = descripSnippet[0] + '.';
//         console.log('description is:' + description);
//     }
// }



function handleImg(book){
    const bookImg = book.volumeInfo.imageLinks.thumbnail;
    if (bookImg === undefined){
        bookImgEl.textContent = 'No image available.'
        console.log('no image')
    }else {
        imageListItem.setAttribute('src', bookImg);
        console.log('image link is:' + bookImg);
    }
}