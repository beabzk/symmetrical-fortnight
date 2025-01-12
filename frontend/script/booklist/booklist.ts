interface Book {
  title: string;
  author: string;
  genre: string;
  availability: string;
}

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('form') as HTMLFormElement;
  const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
  const tableBody = document.querySelector('tbody') as HTMLTableSectionElement;

  let allBooks: Book[] = [];
  const defaultBooks: Book[] = [
      { title: "The Lord of the Rings", author: "J.R.R. Tolkien", genre: "Fantasy", availability: "Available" },
      { title: "Pride and Prejudice", author: "Jane Austen", genre: "Classic", availability: "Available" },
      { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", genre: "Science Fiction", availability: "Available" },
      { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", availability: "Unavailable" },
      { title: "Another Book", author: "Another Author", genre: "Fiction", availability: "Available" }
  ];

  function loadBooks() {
      const storedBooks = localStorage.getItem('books');
      if (storedBooks) {
          try {
              allBooks = JSON.parse(storedBooks) as Book[];
          } catch (error) {
              console.error("Error retrieving data from local storage", error);
          }
      } else {
          allBooks = defaultBooks;
      }
      renderTable(allBooks);
  }

  function renderTable(books: Book[]): void {
      tableBody.innerHTML = ""; // Clear existing rows

      books.forEach(book => {
          const row = document.createElement('tr');
          row.style.cursor = 'pointer'; // Change cursor to a pointer on hover
          row.addEventListener('click', () => {
              showBookDetails(book);
          });

          row.innerHTML = `
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.genre}</td>
              <td>${book.availability}</td>`;
          tableBody.appendChild(row);
      });
  }

  function filterBooks(books: Book[], searchTerm: string): Book[] {
      if (!searchTerm) {
          return books;
      }
      return books.filter(book =>
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm) ||
          book.genre.toLowerCase().includes(searchTerm)
      );
  }

  function showBookDetails(book: Book): void {
      localStorage.setItem('selectedBook', JSON.stringify(book));
      window.location.href = "bookDetails.html";
  }

  loadBooks(); // Load books from local storage

  searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchTerm = searchInput.value.trim().toLowerCase();
      const filteredBooks = filterBooks(allBooks, searchTerm);
      renderTable(filteredBooks);
      localStorage.setItem('lastSearchTerm', searchTerm);
  });

  searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const filteredBooks = filterBooks(allBooks, searchTerm);
      renderTable(filteredBooks);
  });

  const storedSearchTerm = localStorage.getItem('lastSearchTerm');
  if (storedSearchTerm) {
      searchInput.value = storedSearchTerm;
      const filteredBooks = filterBooks(allBooks, storedSearchTerm);
      renderTable(filteredBooks);
  }

  window.addEventListener('beforeunload', () => {
      loadBooks();
  });
});
