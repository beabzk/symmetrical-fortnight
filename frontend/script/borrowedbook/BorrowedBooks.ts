interface Book {
    title: string;
    author: string;
    genre: string;
    description: string;
    availability: string; // "Available" or "Unavailable"
}

interface BorrowedBook {
    name: string;
    title: string;
    issueDate: string;
    returnDate: string;
}

let borrowedBooks: BorrowedBook[] = JSON.parse(localStorage.getItem('borrowedBooks') || '[]') || [];
let books: Book[] = JSON.parse(localStorage.getItem('books') || '[]') || [];

function isValidDate(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Matches YYYY-MM-DD format
    if (!dateString.match(regex)) {
        return false;
    }

    const parts = dateString.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const date = new Date(year, month, day);
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
}

function isPastOrFuture(dateString: string): string {
    if (!isValidDate(dateString)) {
        return "Invalid date format.";
    }

    const givenDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure only the date part is compared

    if (givenDate < today) {
        return "Past";
    } else if (givenDate > today) {
        return "Future";
    } else {
        return "Present";
    }
}

function handleBorrowForm(event: Event): void {
    event.preventDefault(); // Prevent default form submission

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const titleInput = document.getElementById("title") as HTMLInputElement;
    const issueDateInput = document.getElementById("issueDate") as HTMLInputElement;
    const returnDateInput = document.getElementById("returnDate") as HTMLInputElement;
    const availabilityMessage = document.getElementById("availabilityMessage") as HTMLDivElement;

    const bookTitle = titleInput.value.trim();

    // Validate issue and return dates
    const issueDateStatus = isPastOrFuture(issueDateInput.value);
    const returnDateStatus = isPastOrFuture(returnDateInput.value);

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
    const issueDate = new Date(issueDateInput.value);
    const returnDate = new Date(returnDateInput.value);
    if (issueDate >= returnDate) {
        availabilityMessage.textContent = "Issue date cannot be greater than or equal to return date.";
        availabilityMessage.style.color = "red";
        return;
    }

    // Check if the book exists and is available
    const book = books.find(b => b.title.toLowerCase() === bookTitle.toLowerCase() && b.availability === "Available");

    if (!book) {
        titleInput.style.border = "2px solid red";
        availabilityMessage.textContent = "This book is either not available or does not exist.";
        availabilityMessage.style.color = "red";
        return;
    }

    // Create a new borrowed book entry
    const newBorrowedBook: BorrowedBook = {
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

function displayBorrowedBooks(): void {
    const borrowedBooksList = document.getElementById("borrowedBooksList") as HTMLUListElement;
    borrowedBooksList.innerHTML = ''; // Clear existing list

    borrowedBooks.forEach((book) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.innerText = `${book.name} borrowed "${book.title}" from ${book.issueDate} to ${book.returnDate}`;
        borrowedBooksList.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("borrowForm")!.addEventListener("submit", handleBorrowForm);
    displayBorrowedBooks();
});

