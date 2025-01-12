# Symmetrical Fortnight

A full-stack library management system developed with NestJS for the backend and TypeScript for the frontend. This system provides robust functionalities for managing books, users, and borrowing activities within a library.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Book Management Endpoints](#book-management-endpoints)
  - [User Management Endpoints](#user-management-endpoints)
  - [Borrowing and Returning Endpoints](#borrowing-and-returning-endpoints)
- [Frontend Usage](#frontend-usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Description

Symmetrical Fortnight is a comprehensive library management system that allows administrators and users to interact with a digital library. The system is built with a NestJS backend and a TypeScript frontend, providing a seamless user experience. It includes functionalities for managing books, managing users with different roles (admin and regular users), and handling book borrowing and returning activities.

## Features

- **Authentication**:
  - User registration with password validation
  - Secure login with JWT authentication
  - Admin and regular user roles
- **Book Management**:
  - Add new books with title, author, genre, and publication date
  - Update existing book details
  - Remove books from the system
  - Toggle book availability
  - Search books by title, author, or genre
- **User Management**:
  - List all users
  - View user profiles
  - Update user details
  - Delete users
  - Deactivate/activate users
- **Borrowing System**:
  - Borrow books with validation of issue and return dates
  - Return borrowed books
  - View borrowing history
  - Display overdue books
- **Frontend**:
  - User dashboard for easy navigation and book search
  - Responsive design for various screen sizes

## Technologies Used

- **Backend**:
  - NestJS
  - Prisma ORM
  - PostgreSQL (or any database compatible with Prisma)
  - JWT for authentication
  - Bcrypt for password hashing
  - Class-validator and class-transformer for DTO validation
- **Frontend**:
  - TypeScript
  - HTML5
  - CSS3
  - Bootstrap 5.3.0
- **Development Tools**:
  - Node.js
  - npm
  - TypeScript
  - ESLint
  - Prettier
  - Jest for testing

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/beabzk/symmetrical-fortnight.git
cd symmetrical-fortnight
```

2. **Install Backend Dependencies:**

```bash
cd backend
npm install
```

3. **Install Frontend Dependencies:**

```bash
cd frontend
npm install
```

4. **Build the Frontend:**

```bash
npm run build
```

## Configuration

1. **Database Setup:**
   - Ensure that PostgreSQL (or your chosen database) is installed and running.
   - Create a database for the application.

2. **Environment Variables:**
   - Create a `.env` file in the `backend` directory.
   - Add the following environment variables:

   ```
   DATABASE_URL="postgresql://user:password@host:port/database"
   JWT_SECRET=your_secret_key_here
   ```

   - Replace `your_secret_key_here` with a strong, unique secret key for JWT.
   - Update `DATABASE_URL` with your actual database connection string.

3. **Prisma Setup:**
   - Initialize Prisma:

   ```bash
   npx prisma init
   ```

   - Migrate the database schema:

   ```bash
   npx prisma migrate dev --name init
   ```

## API Documentation

### Authentication Endpoints

- **POST /auth/signup**
  - Registers a new user.
  - Request body:

    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "securepassword",
      "userRole": "USER" // or "ADMIN"
    }
    ```

  - Response:
    - 201 Created: Returns a JWT access token.
    - 403 Forbidden: If the email is already registered.

- **POST /auth/signin**
  - Logs in an existing user.
  - Request body:

    ```json
    {
      "email": "john.doe@example.com",
      "password": "securepassword"
    }
    ```

  - Response:
    - 200 OK: Returns a JWT access token.
    - 403 Forbidden: If credentials are incorrect.

### Book Management Endpoints

- **POST /books**
  - Adds a new book (admin only).
  - Request body:

    ```json
    {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "publishedDate": "1925-04-10",
      "genre": "Fiction",
      "isAvailable": true
    }
    ```

  - Response:
    - 201 Created: Returns the created book object.
    - 403 Forbidden: If the user is not an admin.

- **GET /books**
  - Retrieves all books.
  - Response:
    - 200 OK: Returns an array of book objects.

- **PATCH /books/:id**
  - Updates an existing book (admin only).
  - Request body (partial update):

    ```json
    {
      "title": "The Great Gatsby (Updated)",
      "isAvailable": false
    }
    ```

  - Response:
    - 200 OK: Returns the updated book object.
    - 403 Forbidden: If the user is not an admin.

- **DELETE /books/:id**
  - Removes a book from the system (admin only).
  - Response:
    - 200 OK: Returns the deleted book object.
    - 403 Forbidden: If the user is not an admin.

### User Management Endpoints

- **GET /users/me**
  - Retrieves the current user's profile (requires authentication).
  - Response:
    - 200 OK: Returns the user object.
    - 401 Unauthorized: If the user is not authenticated.

- **GET /users**
  - Retrieves all users (admin only).
  - Response:
    - 200 OK: Returns an array of user objects.
    - 403 Forbidden: If the user is not an admin.

### Borrowing and Returning Endpoints

- **POST /books/:id/borrow**
  - Borrows a book (requires authentication).
  - Response:
    - 200 OK: Returns a success message.
    - 400 Bad Request: If the book is not available.

- **POST /books/:id/return**
  - Returns a borrowed book (requires authentication).
  - Response:
    - 200 OK: Returns a success message.

## Frontend Usage

The frontend provides a user-friendly interface for interacting with the library system. Key features include:

- **Navigation Bar**: Allows users to navigate between different sections such as Profile, Book List, Borrowed Books, and Logout.
- **User Dashboard**: Displays user information, search functionality, and a list of borrowed books.
- **Book List**: Shows all available books with details and actions to borrow or return books.
- **Borrowed Books**: Lists all books currently borrowed by the user, along with their issue and due dates.
- **Registration/Login**: Allows users to register and log in to the system.

### Navigation

- **Profile**: View and update your profile information.
- **Book List**: Browse available books, search for books, and view book details.
- **Borrowed Books**: Manage your borrowed books and view borrowing history.
- **Logout**: Securely log out of the system.

## Contributing

Contributions to the Symmetrical Fortnight project are welcome. Please follow these steps to contribute:

1. Fork the repository.
1. Create a new branch for your feature or bug fix.
1. Make your changes and ensure all tests pass.
1. Submit a pull request with a clear description of your changes.

For more detailed instructions, see the `CONTRIBUTING.md` file.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
