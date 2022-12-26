'use strict';

var BOOK_TEMPLATE =
    '<h2 class="sticky-xl-top fw-bold pt-3 pt-xl-5 pb-2 pb-xl-3 title"></h2>' +
    '<article class="my-3" id="">' +
    '<div class="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">' +
    '<h3></h3>' +
    '</div>' +
    '<div>' +
    '<div class="bd-example">' +
    '<ol class="list-group list-group-numbered">' + '</ol>' +
    '</div>' +
    '</div>' +
    '</article>'

function loadBooks() {
    var books = firebase.firestore().collection('books');

    // Start listening to the query.
    books.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            var book = change.doc.data();
            var answers = loadAnswers(change.doc.id)
            displayBooks(change.doc.id, book.title);
        });
    });
}

function loadAnswers(id) {
    var answers = firebase.firestore().collection('answers').where('book_id', "==", id);
    answers.get().then((snap) => {
        snap.forEach(doc => {
            var answer = doc.data()
            displayAnswers(answer, id)
        })
    })
}

function displayBooks(id, title) {
    var section = createAndInsertBookTitle(id);

    section.querySelector('.title').textContent = title;
    var titleElement = section.querySelector('.title');

    if (title) { // If the message is text.
        titleElement.textContent = title;
        // Replace all line breaks by <br>.
        titleElement.innerHTML = titleElement.innerHTML.replace(/\n/g, '<br>');
    }
}

function displayAnswers(answers, id) {
    var answerList = document.getElementById(id).querySelector("ol")

    for (var i = 0; i < answers.chapter_001.length; i++) {
        //create li
        var li = document.createElement("li");
        li.classList.add("list-group-item");
        for (var j = 1; j <= 4; j++) {
            //create a button
            var button = document.createElement("button")
            button.setAttribute("type", "button")
            button.style.margin = "0 .1rem"
            button.classList.add("btn")
            button.classList.add("btn-primary")
            button.innerHTML = getButtonText(j)

            li.insertAdjacentElement("beforeend", button)

        }

        answerList.insertAdjacentElement("afterbegin", li)
    }
}

function getButtonText(position) {
    var text = ""
    switch (position) {
        case 1:
            text = "A"
            break;
        case 2:
            text = "B"
            break;
        case 3:
            text = "C"
            break;
        case 4:
            text = "D"
            break;
    }
    return text
}

function createAndInsertAnswers(answers) {
    //const container = document.createElement('section');
    //return container
}

function createAndInsertBookTitle(id, title) {
    const container = document.createElement('section');
    container.innerHTML = BOOK_TEMPLATE;

    const timestamp = Date.now();
    container.setAttribute('id', id);
    container.setAttribute('timestamp', timestamp);

    // figure out where to insert new message
    const existingBooks = bookListElement.children;
    if (existingBooks.length === 0) {
        bookListElement.appendChild(container);
    } else {
        let bookListNode = existingBooks[0];
        while (bookListNode) {
            const bookListNodeTime = bookListNode.getAttribute('timestamp');

            if (!bookListNodeTime) {
                throw new Error(
                    `Child ${bookListNode.id} has no 'timestamp' attribute`
                );
            }

            if (bookListNodeTime > timestamp) {
                break;
            }

            bookListNode = bookListNode.nextSibling;
        }

        bookListElement.insertBefore(container, bookListNode);
    }

    return container;
}

// Shortcuts to DOM Elements.
var bookListElement = document.getElementById('books');
var messageFormElement = document.getElementById('message-form');
var messageInputElement = document.getElementById('message');
var submitButtonElement = document.getElementById('submit');
var imageButtonElement = document.getElementById('submitImage');
var imageFormElement = document.getElementById('image-form');
var mediaCaptureElement = document.getElementById('mediaCapture');
var userPicElement = document.getElementById('user-pic');
var userNameElement = document.getElementById('user-name');
var signInButtonElement = document.getElementById('sign-in');
var signOutButtonElement = document.getElementById('sign-out');
var signInSnackbarElement = document.getElementById('must-signin-snackbar');

loadBooks();