var borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks') || '[]') || [];
var books = JSON.parse(localStorage.getItem('books') || '[]') || [];
function isValidDate(dateString) {
    var regex = /^\d{4}-\d{2}-\d{2}$/; // Matches YYYY-MM-DD format
    if (!dateString.match(regex)) {
        return false;
    }
    var parts = dateString.split("-");
    var year = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1;
    var day = parseInt(parts[2], 10);
    var date = new Date(year, month, day);
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
}
function isPastOrFuture(dateString) {
    if (!isValidDate(dateString)) {
        return "Invalid date format.";
    }
    var givenDate = new Date(dateString);
    var today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure only the date part is compared
    if (givenDate < today) {
        return "Past";
    }
    else if (givenDate > today) {
        return "Future";
    }
    else {
        return "Present";
    }
}
function handleBorrowForm(event) {
    event.preventDefault(); // Prevent default form submission
    var nameInput = document.getElementById("name");
    var titleInput = document.getElementById("title");
    var issueDateInput = document.getElementById("issueDate");
    var returnDateInput = document.getElementById("returnDate");
    var availabilityMessage = document.getElementById("availabilityMessage");
    var bookTitle = titleInput.value.trim();
    // Validate issue and return dates
    var issueDateStatus = isPastOrFuture(issueDateInput.value);
    var returnDateStatus = isPastOrFuture(returnDateInput.value);
    if (issueDateStatus === "Invalid date format." || returnDateStatus === "Invalid date format.") {
        availabilityMessage.textContent = "Invalid date format. Use YYYY-MM-DD.";
        availabilityMessage.style.color = "red";
        return;
    }
    if (issueDateStatus === "Past") {
        availabilityMessage.textContent = "Issue date cannot be in the past.";
        availabilityMessage.style.color = "red";
        return;
    }
    if (returnDateStatus !== "Future") {
        availabilityMessage.textContent = "Return date must be in the future.";
        availabilityMessage.style.color = "red";
        return;
    }
    // Ensure the issue date is not greater than the return date
    var issueDate = new Date(issueDateInput.value);
    var returnDate = new Date(returnDateInput.value);
    if (issueDate >= returnDate) {
        availabilityMessage.textContent = "Issue date cannot be greater than or equal to return date.";
        availabilityMessage.style.color = "red";
        return;
    }
    // Check if the book exists and is available
    var book = books.find(function (b) { return b.title.toLowerCase() === bookTitle.toLowerCase() && b.availability === "Available"; });
    if (!book) {
        titleInput.style.border = "2px solid red";
        availabilityMessage.textContent = "This book is either not available or does not exist.";
        availabilityMessage.style.color = "red";
        return;
    }
    // Create a new borrowed book entry
    var newBorrowedBook = {
        name: nameInput.value,
        title: book.title,
        issueDate: issueDateInput.value,
        returnDate: returnDateInput.value,
    };
    // Add the new borrowed book to the list
    borrowedBooks.push(newBorrowedBook);
    // Update book availability
    book.availability = "Unavailable";
    localStorage.setItem('books', JSON.stringify(books));
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
    // Clear the form inputs
    nameInput.value = '';
    titleInput.value = '';
    issueDateInput.value = '';
    returnDateInput.value = '';
    titleInput.style.border = "";
    availabilityMessage.textContent = "";
    // Update the displayed list of borrowed books
    displayBorrowedBooks();
}
function displayBorrowedBooks() {
    var borrowedBooksList = document.getElementById("borrowedBooksList");
    borrowedBooksList.innerHTML = ''; // Clear existing list
    borrowedBooks.forEach(function (book) {
        var listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.innerText = "".concat(book.name, " borrowed \"").concat(book.title, "\" from ").concat(book.issueDate, " to ").concat(book.returnDate);
        borrowedBooksList.appendChild(listItem);
    });
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("borrowForm").addEventListener("submit", handleBorrowForm);
    displayBorrowedBooks();
});
