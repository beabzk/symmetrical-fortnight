// dashboard.ts

interface Book1 {
    title: string;
    dueDate: string;
}

const borrowedBooks: Book1[] = [
    {
        title: "Book 1", dueDate: "01/15/2025",
        
    },
    {
        title: "Book 2", dueDate: "01/20/2025",
        
    }
];

// Function to display borrowed books
function displayBorrowedBooks(books: Book1[]): void {
    const bookList = document.getElementById("bookList");
    if (bookList) {
        bookList.innerHTML = ""; // Clear existing list
        books.forEach(book => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.textContent = `${book.title} - Due Date: ${book.dueDate}`;
            bookList.appendChild(listItem);
        });
    }
}

// Function to handle search
function searchBooks(event: Event): void {
    event.preventDefault(); // Prevent form submission

    const searchInput = document.getElementById("searchInput") as HTMLInputElement;
    const query = searchInput.value.toLowerCase();

    const filteredBooks = borrowedBooks.filter(book => book.title.toLowerCase().includes(query));
    displayBorrowedBooks(filteredBooks);
}

// Event listener for the search form
document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    if (searchForm) {
        searchForm.addEventListener("submit", searchBooks);
    }

    // Display initial borrowed books
    displayBorrowedBooks(borrowedBooks);
});
