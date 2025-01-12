interface BookDetails {
    title: string;
    author: string;
    genre: string;
    availability: string;
}

document.addEventListener('DOMContentLoaded', () => {
    const bookTitleElement = document.getElementById("bookTitle") as HTMLHeadingElement;
    const bookAuthorElement = document.getElementById("bookAuthor") as HTMLSpanElement;
    const bookGenreElement = document.getElementById("bookGenre") as HTMLSpanElement;
    const bookAvailabilityElement = document.getElementById("bookAvailability") as HTMLSpanElement;
    const borrowButton = document.getElementById("borrowButton") as HTMLButtonElement;
    const availabilityMessage = document.getElementById("availabilityMessage") as HTMLDivElement;

    const storedBook = localStorage.getItem('selectedBook');
    if (storedBook) {
        const book: BookDetails = JSON.parse(storedBook) as BookDetails;
        bookTitleElement.textContent = book.title;
        bookAuthorElement.textContent = book.author;
        bookGenreElement.textContent = book.genre;
        bookAvailabilityElement.textContent = book.availability;

        borrowButton.addEventListener("click", () => {
            if (book.availability.toLowerCase() === "available") {
                // book.availability = "Unavailable"; // Mark as unavailable
                // updateBookAvailability(book); // Update availability in local storage
                // bookAvailabilityElement.textContent = book.availability; // Update display
                availabilityMessage.textContent = "You have borrowed the book. Enjoy!";
                availabilityMessage.style.color = "green";
                window.location.href = "Borrowed Books.html";
                
            } else {
                availabilityMessage.textContent = "Sorry, this book is currently not available for borrowing.";
                availabilityMessage.style.color = "red";
            }
        });
    } else {
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
