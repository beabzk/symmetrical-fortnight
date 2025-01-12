interface Book {
    title: string;
    author: string;
    genre: string;
    availability: string;
}

let books: Book[] = [];

function loadBooks() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        try {
            books = JSON.parse(storedBooks) as Book[];
        } catch (error) {
            console.error("Error retrieving data from local storage", error);
        }
    }
    renderBooks();
}

function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}

function renderBooks() {
    const tbody = document.querySelector("tbody");
    if (!tbody) return;

    tbody.innerHTML = ""; // Clear existing rows

    books.forEach((book, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.availability}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editBook(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteBook(${index})">Delete</button>
                <button class="btn btn-warning btn-sm" onclick="toggleAvailability(${index})">${book.availability === "Available" ? "Issue" : "Return"}</button> <!-- Single toggle button -->
            </td>`;
        tbody.appendChild(row);
    });
    saveBooks(); // Ensuring localStorage is always updated
}

function addBook(event: Event) {
    event.preventDefault(); // Prevent form submission

    const titleInput = document.getElementById("title") as HTMLInputElement;
    const authorInput = document.getElementById("author") as HTMLInputElement;
    const genreInput = document.getElementById("genre") as HTMLSelectElement;

    const newBook: Book = {
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

function editBook(index: number) {
    const book = books[index];
    if (!book) return;

    const titleInput = document.getElementById("title") as HTMLInputElement;
    const authorInput = document.getElementById("author") as HTMLInputElement;
    const genreInput = document.getElementById("genre") as HTMLSelectElement;

    titleInput.value = book.title;
    authorInput.value = book.author;
    genreInput.value = book.genre;

    books.splice(index, 1); // Remove the book from the array for editing
    renderBooks(); // Re-render the book list
}

function deleteBook(index: number) {
    if (books[index]) {
        books.splice(index, 1); // Remove book from the array
        renderBooks(); // Re-render the book list
    }
}

function toggleAvailability(index: number) {
    const book = books[index];
    if (!book) return;

    book.availability = book.availability === "Available" ? "Issued" : "Available";
    renderBooks(); // Re-render the book list
}

// Initial rendering of books
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("addBookForm") as HTMLFormElement;
    if (form) {
        form.addEventListener("submit", addBook);
    }

    loadBooks(); // Load books from local storage
});
