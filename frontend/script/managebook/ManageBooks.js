var books = [];
function loadBooks() {
    var storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        try {
            books = JSON.parse(storedBooks);
        }
        catch (error) {
            console.error("Error retrieving data from local storage", error);
        }
    }
    renderBooks();
}
function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}
function renderBooks() {
    var tbody = document.querySelector("tbody");
    if (!tbody)
        return;
    tbody.innerHTML = ""; // Clear existing rows
    books.forEach(function (book, index) {
        var row = document.createElement("tr");
        row.innerHTML = "\n            <td>".concat(book.title, "</td>\n            <td>").concat(book.author, "</td>\n            <td>").concat(book.genre, "</td>\n            <td>").concat(book.availability, "</td>\n            <td>\n                <button class=\"btn btn-primary btn-sm\" onclick=\"editBook(").concat(index, ")\">Edit</button>\n                <button class=\"btn btn-danger btn-sm\" onclick=\"deleteBook(").concat(index, ")\">Delete</button>\n                <button class=\"btn btn-warning btn-sm\" onclick=\"toggleAvailability(").concat(index, ")\">").concat(book.availability === "Available" ? "Issue" : "Return", "</button> <!-- Single toggle button -->\n            </td>");
        tbody.appendChild(row);
    });
    saveBooks(); // Ensuring localStorage is always updated
}
function addBook(event) {
    event.preventDefault(); // Prevent form submission
    var titleInput = document.getElementById("title");
    var authorInput = document.getElementById("author");
    var genreInput = document.getElementById("genre");
    var newBook = {
        title: titleInput.value,
        author: authorInput.value,
        genre: genreInput.value,
        availability: "Available", // Default to available
    };
    books.push(newBook); // Add new book to the array
    renderBooks(); // Re-render the book list
    // Clear input fields
    titleInput.value = "";
    authorInput.value = "";
    genreInput.value = "";
}
function editBook(index) {
    var book = books[index];
    if (!book)
        return;
    var titleInput = document.getElementById("title");
    var authorInput = document.getElementById("author");
    var genreInput = document.getElementById("genre");
    titleInput.value = book.title;
    authorInput.value = book.author;
    genreInput.value = book.genre;
    books.splice(index, 1); // Remove the book from the array for editing
    renderBooks(); // Re-render the book list
}
function deleteBook(index) {
    if (books[index]) {
        books.splice(index, 1); // Remove book from the array
        renderBooks(); // Re-render the book list
    }
}
function toggleAvailability(index) {
    var book = books[index];
    if (!book)
        return;
    book.availability = book.availability === "Available" ? "Issued" : "Available";
    renderBooks(); // Re-render the book list
}
// Initial rendering of books
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById("addBookForm");
    if (form) {
        form.addEventListener("submit", addBook);
    }
    loadBooks(); // Load books from local storage
});
