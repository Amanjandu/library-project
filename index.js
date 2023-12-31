console.log("This is index.js");

//construtor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//display constructor
function Display() {

}

// Add methods to display prototype
Display.prototype.add = function (book) {
    console.log("Adding to UI")
    tableBody = document.getElementById('tableBody');
    let uiString = `    <tr>
                            
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td> 
                        </tr> `;
    tableBody.innerHTML += uiString;

}
//implement the clear fucntion
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('LibraryForm');
    libraryForm.reset();
}


//implement the validate fucntion
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false
    }
    else {
        return true;
    }
}


//implement the show fucntion
Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message: </strong> ${displayMessage}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`
    setTimeout(function () {
         message.innerHTML = ''
    }, 5000);
}


//Add submit event listener to LibraryForm
let libraryForm = document.getElementById('LibraryForm');
libraryForm.addEventListener('submit', LibraryFormSubmit)

function LibraryFormSubmit(e) {
    console.log('You have submitted library form');
    let name = document.getElementById('Book Name').value;
    let author = document.getElementById('author').value;
    let type;

    let Fiction = document.getElementById('Fiction');
    let Programming = document.getElementById('Programming');
    let Cooking = document.getElementById('Cooking');

    if (Fiction.checked) {
        type = Fiction.value;
    }
    else if (Programming.checked) {
        type = Programming.value;
    }
    else if (Cooking.checked) {
        type = Cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);


    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', ' your book is successfully added')
    }
    else {
        display.show('danger', ' Sorry, you cannot add this book.')
    }

    e.preventDefault();
}