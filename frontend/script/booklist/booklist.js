document.addEventListener('DOMContentLoaded', function () {
    var searchForm = document.querySelector('form');
    var searchInput = document.querySelector('input[type="search"]');
    var tableBody = document.querySelector('tbody');
    var allBooks = [];
    var defaultBooks = [
        { title: "The Lord of the Rings", author: "J.R.R. Tolkien", genre: "Fantasy", availability: "Available" },
        { title: "Pride and Prejudice", author: "Jane Austen", genre: "Classic", availability: "Available" },
        { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", genre: "Science Fiction", availability: "Available" },
        { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", availability: "Unavailable" },
        { title: "Another Book", author: "Another Author", genre: "Fiction", availability: "Available" }
    ];
    function loadBooks() {
        var storedBooks = localStorage.getItem('books');
        if (storedBooks) {
            try {
                allBooks = JSON.parse(storedBooks);
            }
            catch (error) {
                console.error("Error retrieving data from local storage", error);
            }
        }
        else {
            allBooks = defaultBooks;
        }
        renderTable(allBooks);
    }
    function renderTable(books) {
        tableBody.innerHTML = ""; // Clear existing rows
        books.forEach(function (book) {
            var row = document.createElement('tr');
            row.style.cursor = 'pointer'; // Change cursor to a pointer on hover
            row.addEventListener('click', function () {
                showBookDetails(book);
            });
            row.innerHTML = "\n              <td>".concat(book.title, "</td>\n              <td>").concat(book.author, "</td>\n              <td>").concat(book.genre, "</td>\n              <td>").concat(book.availability, "</td>");
            tableBody.appendChild(row);
        });
    }
    function filterBooks(books, searchTerm) {
        if (!searchTerm) {
            return books;
        }
        return books.filter(function (book) {
            return book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm) ||
                book.genre.toLowerCase().includes(searchTerm);
        });
    }
    function showBookDetails(book) {
        localStorage.setItem('selectedBook', JSON.stringify(book));
        window.location.href = "bookDetails.html";
    }
    loadBooks(); // Load books from local storage
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var searchTerm = searchInput.value.trim().toLowerCase();
        var filteredBooks = filterBooks(allBooks, searchTerm);
        renderTable(filteredBooks);
        localStorage.setItem('lastSearchTerm', searchTerm);
    });
    searchInput.addEventListener('input', function () {
        var searchTerm = searchInput.value.trim().toLowerCase();
        var filteredBooks = filterBooks(allBooks, searchTerm);
        renderTable(filteredBooks);
    });
    var storedSearchTerm = localStorage.getItem('lastSearchTerm');
    if (storedSearchTerm) {
        searchInput.value = storedSearchTerm;
        var filteredBooks = filterBooks(allBooks, storedSearchTerm);
        renderTable(filteredBooks);
    }
    window.addEventListener('beforeunload', function () {
        loadBooks();
    });
});
