const API_URL = 'http://localhost:3333/books'; // Base URL for book-related endpoints
const AUTH_URL = 'http://localhost:3333/auth'; // Base URL for authentication endpoints

// Display all books
function displayBooks() {
  console.log('displayBooks function called'); // Debugging statement
  fetch(API_URL)
    .then(response => {
      console.log('Fetch response received'); // Debugging statement
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data); // Debugging statement
      const bookList = document.getElementById("book-list");
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
    .catch(error => console.error('Error fetching books:', error));
}

// Initialize the page by displaying books
document.addEventListener('DOMContentLoaded', displayBooks);
// Borrow a book
function borrowBook(id) {
  fetch(`${API_URL}/${id}/borrow`, {
    method: 'POST',
  })
    .then(response => {
      if (response.ok) {
        alert("Book borrowed successfully!");
        displayBooks();
      } else {
        alert("Failed to borrow the book. It might not be available.");
      }
    })
    .catch(error => console.error('Error borrowing book:', error));
}

// Return a book
function returnBook(id) {
  fetch(`${API_URL}/${id}/return`, {
    method: 'POST',
  })
    .then(response => {
      if (response.ok) {
        alert("Book returned successfully!");
        displayBooks();
      } else {
        alert("Failed to return the book. Please try again.");
      }
    })
    .catch(error => console.error('Error returning book:', error));
}

// Add a new book (Admin only)
function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const publishedDate = document.getElementById("publishedDate").value;
  const genre = document.getElementById("genre").value;
  const isAvailable = document.getElementById("isAvailable").checked;

  if (title && author && publishedDate && genre) {
    const newBook = { title, author, publishedDate, genre, isAvailable };
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    })
      .then(response => response.json())
      .then(data => {
        alert("Book added successfully!");
        displayBooks();
      })
      .catch(error => console.error('Error adding book:', error));
  } else {
    alert("Please fill in all fields.");
  }
}

// Update a book (Admin only)
function updateBook(id) {
  const updatedData = {
    title: document.getElementById("updateTitle").value,
    isAvailable: document.getElementById("updateIsAvailable").checked,
  };

  fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  })
    .then(response => response.json())
    .then(data => {
      alert("Book updated successfully!");
      displayBooks();
    })
    .catch(error => console.error('Error updating book:', error));
}

// Remove a book (Admin only)
function removeBook(id) {
  if (confirm("Are you sure you want to remove this book?")) {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          alert("Book removed successfully!");
          displayBooks();
        } else {
          alert("Failed to remove the book.");
        }
      })
      .catch(error => console.error('Error removing book:', error));
  }
}

// Sign up a user
function signupUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;
  const userRole = document.getElementById("userRole").value;

  if (email && password && name && userRole) {
    const newUser = { email, password, name, userRole };
    fetch(`${AUTH_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(data => {
        alert("User signed up successfully!");
      })
      .catch(error => console.error('Error signing up user:', error));
  } else {
    alert("Please fill in all fields.");
  }
}

// Sign in a user
function signinUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    const userCredentials = { email, password };
    fetch(`${AUTH_URL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userCredentials),
    })
      .then(response => response.json())
      .then(data => {
        alert("User signed in successfully!");
        // Store token or session if applicable
      })
      .catch(error => console.error('Error signing in user:', error));
  } else {
    alert("Please fill in all fields.");
  }
}

// Clear form inputs
function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("publishedDate").value = "";
  document.getElementById("genre").value = "";
  document.getElementById("isAvailable").checked = false;
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("name").value = "";
  document.getElementById("userRole").value = "";
}

// Initialize the page by displaying books
displayBooks();
