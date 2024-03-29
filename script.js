// book factory
const Book = (title, author, pages, read) => {
    const isRead = () => read === true;

    const toggleRead = () => {
        if (read) {
            read = false;
        } else {
            read = true;
        }
    }

    const info = () => {
        let readString = ''
        if (isRead()) {
            readString = 'read';
        } else {
            readString = 'not read yet';
        }
        return title.concat(' by ', author, ', ', pages, ', ', readString);
    }

    return {title, author, pages, toggleRead, isRead, info};
}

// library container module
const libraryModule = (() => {
    let library = [];
    const libraryContainer = document.querySelector('.library-container');

    function displayBooks() {
        libraryContainer.innerHTML = '';
        library.forEach((book) => {
            libraryContainer.append(createBook(book))
            const readBtn = document.querySelector('.read-btn');
            if (book.isRead()) {
                readBtn.classList.add('read');
            } else {
                readBtn.classList.remove('read');
            }
        });

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
        return library.filter((book) => book.title.toLowerCase() === title.toLowerCase() 
                                        && book.author.toLowerCase() === author.toLowerCase())[0];
    }

    function getBookByCard(bookCard) {
        return library.filter((book) => bookCard.querySelector('.title').innerHTML.toLowerCase() === book.title.toLowerCase() 
                                        && bookCard.querySelector('.author').innerHTML.toLowerCase() === book.author.toLowerCase())[0];
    }

    function removeBook(removedBook) {
        library = library.filter((book) => removedBook !== book);
    }

    // add book container
    const addBookContainer = document.querySelector('.book-form-container');
    // book card focus container
    const bookCardFocusContainer = document.querySelector('.book-card-focus-container');
    // book card copy div
    const bookCardCopyDiv = document.querySelector('.book-card-copy-div');
    // div with book card info and btns
    const bookCardCopyInfoBtns = bookCardCopyDiv.querySelector('.book-card-copy-info-btns');
    // div with btns
    const bookCardCopyBtns = bookCardCopyDiv.querySelector('.book-card-copy-btns');

    const readBtn = document.querySelector('.read-btn');
    readBtn.removeEventListener
    readBtn.addEventListener('click', () => {
        const bookCardCopyInfo = document.querySelector('.book-card-info-focus');
        const book = getBookByCard(bookCardCopyInfo);
        book.toggleRead();  
        readBtn.classList.toggle('read');
    });

    const delBtn = document.querySelector('.del-btn');
    delBtn.addEventListener('click', () => {
        const bookCardCopyInfo = document.querySelector('.book-card-info-focus');
        removeBook(getBookByCard(bookCardCopyInfo));
        bookCardClose();
        displayBooks();
    });

    const backBtn = document.querySelector('.back-btn');
    backBtn.addEventListener('click', () => bookCardClose());

    function bookCardClose() {
        let bookCard = document.querySelector('.book-card-focus');
        if (bookCard) bookCard.remove();
        let bookCardInfo = document.querySelector('.book-card-info-focus');
        if (bookCardInfo) bookCardInfo.remove();
        showNode(addBookContainer);
        showNode(libraryContainer);
        hideNode(bookCardFocusContainer);
        displayBooks();
    }
    
    function bookCardClick(bookCard) {
        hideNode(addBookContainer);
        hideNode(libraryContainer);
        showNode(bookCardFocusContainer);
    
        // book card copy
        const bookCardCopy = bookCard.cloneNode(true);
        // book card copy info
        const bookCardCopyInfo = bookCardCopy.querySelector('.book-card-info');
        bookCardCopyInfo.childNodes.forEach((child) => {
            child.contentEditable='true';
        });

        showNode(bookCardCopyInfo);
        bookCardCopy.classList.add('book-card-focus');
        bookCardCopyInfo.classList.add('book-card-info-focus');
        bookCardCopyDiv.insertBefore(bookCardCopy, bookCardCopyInfoBtns);
        bookCardCopyInfoBtns.insertBefore(bookCardCopyInfo, bookCardCopyBtns);
        bookCardFocusContainer.append(bookCardCopyDiv);
    }

    return {displayBooks, getLibrary, getBook, bookCardClick}
})();

// book form module
const bookFormModule = (() => {
    const addBookContainer = document.querySelector('.book-form-container');
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
            if ((title && author && pages)) {
                let error = document.querySelector('.error-duplicate');
                if ((libraryModule.getBook(title, author))) {
                    error.classList.remove("inactive");
                } else {
                    addBook(Book(title, author, pages, read));
                    libraryModule.displayBooks();
                    hideNode(bookForm);
                    hideNode(cancelBtn);
                    toggleBackground(addBookContainer);
                    resetAddForm();
                    error.classList.add("inactive");
                }
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

// global functions 
function hideNode(node) {
    node.classList.add('inactive');
}

function showNode(node) {
    node.classList.remove('inactive');
}

//dom
bookFormModule.addBook(Book("The Titan's Curse", "Rick Riordan", 200, true));
libraryModule.displayBooks();