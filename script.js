// book factory
const Book = (title, author, pages, read) => {
    const isRead = () => read === true;

    const info = () => {
        let readString = ''
        if (isRead()) {
            readString = 'read';
        } else {
            readString = 'not read yet';
        }
        return title.concat(' by ', author, ', ', pages, ', ', readString);
    }

    return {title, author, pages, isRead, info};
}

// library container module
const libraryModule = (() => {
    let library = [];
    
    function displayBooks() {
        libraryContainer.innerHTML = '';
        library.forEach((book) => {
            libraryContainer.append(createBook(book))
            const readBtn = document.querySelector('.read-btn');
            if (book.isRead()) {
                readBtn.classList.add('read');
            }
        });
    }

    function createBook(book) {
        let bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
    
        let bookCardInfo = document.createElement('div');
        bookCardInfo.classList.add('book-card-info');
    
        let title = document.createElement('h2');
        title.innerHTML = book.title;
        title.classList.add('title');
    
        let author = document.createElement('h3');
        author.innerHTML = book.author;
        author.classList.add('author');
    
        let pages = document.createElement('h3');
        pages.innerHTML = book.pages;
        pages.classList.add('pages');
        
        bookCardInfo.append(title, author, pages);
        bookCard.append(bookCardInfo);
        return bookCard;
    }

    function getLibrary() {
        return library;
    }

    function getBook(title, author) {
        return library.filter((book) => book.title.toLowerCase() === title.toLowerCase() && book.author.toLowerCase() === author.toLowerCase())[0];
    }

    const bookCardFocusContainer = document.querySelector('.book-card-focus-container');
    // book
    const bookCardCopyDiv = document.querySelector('.book-card-copy-div');
    // div with book card info and btns
    const bookCardCopyInfoBtns = bookCardCopyDiv.querySelector('.book-card-copy-info-btns');
    // div with btns
    const bookCardCopyBtns = bookCardCopyDiv.querySelector('.book-card-copy-btns');
    // book card copy info
    const bookCardCopyInfo = bookCardCopy.querySelector('.book-card-info');
    function bookCardClick(bookCard) {
        hideNode(addBookContainer);
        hideNode(libraryContainer);
        showNode(bookCardFocusContainer);
    
        const bookCardCopy = bookCard.cloneNode(true);
        showNode(bookCardCopyInfo);
        bookCardCopy.classList.add('book-card-focus');
        bookCardCopyInfo.classList.add('book-card-info-focus');
        bookCardCopyDiv.insertBefore(bookCardCopy, bookCardCopyInfoBtns);
        bookCardCopyInfoBtns.insertBefore(bookCardCopyInfo, bookCardCopyBtns);
        bookCardFocusContainer.append(bookCardCopyDiv);
    
        const readBtn = document.querySelector('.read-btn');
        readBtn.addEventListener('click', ()=>readBtn.classList.toggle('read'));
    
        const delBtn = document.querySelector('.del-btn');
        delBtn.addEventListener('click', );
    }
    
    function bookCardClose() {
        
    }
    return {displayBooks, getLibrary, getBook}
})();

// book form module
const bookFormModule = (() => {
    const addBtn = document.querySelector('.add-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const bookForm = document.querySelector('.book-form');
    addBtn.addEventListener('click', (e) => {
        if (bookForm.classList.contains('inactive')) {
            e.preventDefault();
            showNode(bookForm);
            showNode(cancelBtn);
            toggleBackground(addBookContainer);
        } else {
            let title = document.getElementById('title').value;
            let author = document.getElementById('author').value;
            let pages = document.getElementById('pages').value;
            let read = document.getElementById('read').value;
            if ((title && author && pages) && !(libraryModule.getBook(title, author).length)) {
                addBook(Book(title, author, pages, read));
                libraryModule.displayBooks();
                hideNode(bookForm);
                hideNode(cancelBtn);
                toggleBackground(addBookContainer);
                resetAddForm();
            }
        }
    });

    cancelBtn.addEventListener('click', ()=>{
        hideNode(cancelBtn);
        hideNode(bookForm);
        toggleBackground(addBookContainer);
    })

    function addBook(book) {
        libraryModule.getLibrary().push(book)
    }
   
    function resetAddForm() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('pages').value = '';
        document.getElementById('read').checked = false;
    }

    function toggleBackground(node) {
        if (node.classList.contains('background-inactive')) {
            node.classList.remove('background-inactive');
        } else {
            node.classList.add('background-inactive');
        }
    }

    return {addBook}
})();

// function bookCardClick(bookCard) {
//     hideNode(addBookContainer);
//     hideNode(libraryContainer);
//     const bookCardFocusContainer = document.querySelector('.book-card-focus-container');
//     showNode(bookCardFocusContainer);

//     const bookCardCopyDiv = document.querySelector('.book-card-copy-div');
//     const bookCardCopy = bookCard.cloneNode(true);
//     const bookCardCopyInfoBtns = bookCardCopyDiv.querySelector('.book-card-copy-info-btns');
//     const bookCardCopyBtns = bookCardCopyDiv.querySelector('.book-card-copy-btns');
//     const bookCardCopyInfo = bookCardCopy.querySelector('.book-card-info');
//     showNode(bookCardCopyInfo);
//     bookCardCopy.classList.add('book-card-focus');
//     bookCardCopyInfo.classList.add('book-card-info-focus');
//     bookCardCopyDiv.insertBefore(bookCardCopy, bookCardCopyInfoBtns);
//     bookCardCopyInfoBtns.insertBefore(bookCardCopyInfo, bookCardCopyBtns);
//     bookCardFocusContainer.append(bookCardCopyDiv);

//     const readBtn = document.querySelector('.read-btn');
//     readBtn.addEventListener('click', ()=>readBtn.classList.toggle('read'));

//     const delBtn = document.querySelector('.del-btn');
//     delBtn.addEventListener('click', );
// }

// function bookCardClose() {

// }

// global functions 
function hideNode(node) {
    node.classList.add('inactive');
}

function showNode(node) {
    node.classList.remove('inactive');
}

//dom 
const addBookContainer = document.querySelector('.book-form-container');
let libraryContainer = document.querySelector('.library-container');

bookFormModule.addBook(Book("The Titan's Curse", "Rick Riordan", 200, true));
libraryModule.displayBooks();

let bookCards = document.querySelectorAll('.book-card');

bookCards.forEach((bookCard) => {
    const bookInfo = bookCard.querySelector('.book-card-info');
    bookCard.addEventListener('mouseover', () => {
        hideNode(bookInfo);
    })

    bookCard.addEventListener('mouseout', () => {
        showNode(bookInfo);
    })
    
    bookCard.addEventListener('click', () => {
        bookCardClick(bookCard);
    })
})

console.log((libraryModule.getBook("The Titan's Curse", "rick Riordan").isRead()))