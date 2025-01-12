// Sample book data (you can replace this with real data)
var booksa = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction" },
    { title: "1984", author: "George Orwell", genre: "Dystopian" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction" },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction" },
    { title: "Moby Dick", author: "Herman Melville", genre: "Adventure" }
];
// Function to load borrowed books from local storage
function loadBorrowedBooks() {
    var borrowedBooksJson = localStorage.getItem('borrowedBooks');
    return borrowedBooksJson ? JSON.parse(borrowedBooksJson) : [];
}
// Function to save borrowed books to local storage
function saveBorrowedBooks(borrowedBooks) {
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
}
// Function to display borrowed books in the list
function displayBorrowedBooks() {
    var bookList = document.getElementById("bookList");
    bookList.innerHTML = ''; // Clear existing list
    var borrowedBooks = loadBorrowedBooks();
    borrowedBooks.forEach(function (book) {
        var listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.innerText = "".concat(book.title, " by ").concat(book.author);
        bookList.appendChild(listItem);
    });
}
// Function to handle search
function handleSearch(event) {
    event.preventDefault();
    var searchInput = document.getElementById("searchInput");
    var searchTerm = searchInput.value.toLowerCase();
    var filteredBooks = booksa.filter(function (book) {
        return book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm);
    });
    // Display search results
    displaySearchResults(filteredBooks);
}
// Function to display search results
function displaySearchResults(filteredBooks) {
    var bookList = document.getElementById("bookList");
    bookList.innerHTML = ''; // Clear existing list
    filteredBooks.forEach(function (book) {
        var listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        listItem.innerText = "".concat(book.title, " by ").concat(book.author);
        var borrowButton = document.createElement("button");
        borrowButton.className = "btn btn-primary btn-sm";
        borrowButton.innerText = "Borrow";
        borrowButton.onclick = function () { return borrowBook(book); };
        listItem.appendChild(borrowButton);
        bookList.appendChild(listItem);
    });
}
// Function to borrow a book
function borrowBook(book) {
    var borrowedBooks = loadBorrowedBooks();
    // Check if the book is already borrowed
    if (!borrowedBooks.some(function (b) { return b.title === book.title; })) {
        borrowedBooks.push(book);
        saveBorrowedBooks(borrowedBooks);
        alert("You have borrowed \"".concat(book.title, "\"."));
        displayBorrowedBooks(); // Update the displayed list of borrowed books
    }
    else {
        alert("You have already borrowed \"".concat(book.title, "\"."));
    }
}
// Attach event listener to the search form
document.getElementById("searchForm").addEventListener("submit", handleSearch);
// Initial call to display borrowed books on page load
displayBorrowedBooks();
