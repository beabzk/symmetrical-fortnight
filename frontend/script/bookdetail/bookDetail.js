document.addEventListener('DOMContentLoaded', function () {
    var bookTitleElement = document.getElementById("bookTitle");
    var bookAuthorElement = document.getElementById("bookAuthor");
    var bookGenreElement = document.getElementById("bookGenre");
    var bookAvailabilityElement = document.getElementById("bookAvailability");
    var borrowButton = document.getElementById("borrowButton");
    var availabilityMessage = document.getElementById("availabilityMessage");
    var storedBook = localStorage.getItem('selectedBook');
    if (storedBook) {
        var book_1 = JSON.parse(storedBook);
        bookTitleElement.textContent = book_1.title;
        bookAuthorElement.textContent = book_1.author;
        bookGenreElement.textContent = book_1.genre;
        bookAvailabilityElement.textContent = book_1.availability;
        borrowButton.addEventListener("click", function () {
            if (book_1.availability.toLowerCase() === "available") {
                // book.availability = "Unavailable"; // Mark as unavailable
                // updateBookAvailability(book); // Update availability in local storage
                // bookAvailabilityElement.textContent = book.availability; // Update display
                availabilityMessage.textContent = "You have borrowed the book. Enjoy!";
                availabilityMessage.style.color = "green";
                window.location.href = "Borrowed Books.html";
            }
            else {
                availabilityMessage.textContent = "Sorry, this book is currently not available for borrowing.";
                availabilityMessage.style.color = "red";
            }
        });
    }
    else {
        console.error("No book selected");
    }
});
// function updateBookAvailability(updatedBook: BookDetails) {
//     let books: BookDetails[] = JSON.parse(localStorage.getItem('books') as string);
//     const bookIndex = books.findIndex(book => book.title === updatedBook.title);
//     if (bookIndex > -1) {
//         books[bookIndex].availability = updatedBook.availability;
//         localStorage.setItem('books', JSON.stringify(books));
//     }
// }
