const API_URL = 'http://localhost:3333/books';
const AUTH_URL = 'http://localhost:3333/auth';

function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
}

function displayBooks() {
    fetch(API_URL, {
        headers: getAuthHeaders()
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch books');
            return response.json();
        })
        .then(data => {
            const bookList = document.getElementById("book-list");
            if (!bookList) return;

            bookList.innerHTML = "";
            data.forEach(book => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>${book.isAvailable ? "Yes" : "No"}</td>
                <td>
                    <button onclick="borrowBook('${book.id}')" ${!book.isAvailable ? "disabled" : ""}>Borrow</button>
                    <button onclick="returnBook('${book.id}')">Return</button>
                </td>
            `;
                bookList.appendChild(tr);
            });
        })
        .catch(error => console.error('Error:', error));
}

function borrowBook(id) {
    fetch(`${API_URL}/${id}/borrow`, {
        method: 'POST',
        headers: getAuthHeaders()
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to borrow book');
            alert("Book borrowed successfully!");
            displayBooks();
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Failed to borrow the book. It might not be available.");
        });
}

function returnBook(id) {
    fetch(`${API_URL}/${id}/return`, {
        method: 'POST',
        headers: getAuthHeaders()
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to return book');
            alert("Book returned successfully!");
            displayBooks();
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Failed to return the book.");
        });
}

function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const publishedDate = document.getElementById("publishedDate").value;
    const genre = document.getElementById("genre").value;
    const isAvailable = document.getElementById("isAvailable").checked;

    if (!title || !author || !publishedDate || !genre) {
        alert("Please fill in all fields.");
        return;
    }

    fetch(API_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ title, author, publishedDate, genre, isAvailable })
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to add book');
            return response.json();
        })
        .then(() => {
            alert("Book added successfully!");
            displayBooks();
            clearForm();
        })
        .catch(error => console.error('Error:', error));
}

function updateBook(id) {
    const updatedData = {
        title: document.getElementById("updateTitle").value,
        isAvailable: document.getElementById("updateIsAvailable").checked
    };

    fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedData)
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to update book');
            return response.json();
        })
        .then(() => {
            alert("Book updated successfully!");
            displayBooks();
        })
        .catch(error => console.error('Error:', error));
}

function removeBook(id) {
    if (!confirm("Are you sure you want to remove this book?")) return;

    fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to remove book');
            alert("Book removed successfully!");
            displayBooks();
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Failed to remove the book.");
        });
}

function clearForm() {
    const elements = ["title", "author", "publishedDate", "genre", "isAvailable"];
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (element.type === "checkbox") element.checked = false;
            else element.value = "";
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayBooks();
    const token = localStorage.getItem('token');
    if (!token && window.location.pathname !== '/login.html') {
        window.location.href = './login.html';
    }
});