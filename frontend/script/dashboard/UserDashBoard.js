// dashboard.ts
var borrowedBooks = [
    {
        title: "Book 1", dueDate: "01/15/2025",
    },
    {
        title: "Book 2", dueDate: "01/20/2025",
    }
];
// Function to display borrowed books
function displayBorrowedBooks(books) {
    var bookList = document.getElementById("bookList");
    if (bookList) {
        bookList.innerHTML = ""; // Clear existing list
        books.forEach(function (book) {
            var listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.textContent = "".concat(book.title, " - Due Date: ").concat(book.dueDate);
            bookList.appendChild(listItem);
        });
    }
}
// Function to handle search
function searchBooks(event) {
    event.preventDefault(); // Prevent form submission
    var searchInput = document.getElementById("searchInput");
    var query = searchInput.value.toLowerCase();
    var filteredBooks = borrowedBooks.filter(function (book) { return book.title.toLowerCase().includes(query); });
    displayBorrowedBooks(filteredBooks);
}
// Event listener for the search form
document.addEventListener("DOMContentLoaded", function () {
    var searchForm = document.getElementById("searchForm");
    if (searchForm) {
        searchForm.addEventListener("submit", searchBooks);
    }
    // Display initial borrowed books
    displayBorrowedBooks(borrowedBooks);
});
