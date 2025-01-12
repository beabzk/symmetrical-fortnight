interface DashboardStats {
    totalBooks: number;
    activeUsers: number;
    booksBorrowed: number;
}

// Initial mock data for the dashboard
const stats: DashboardStats = {
    totalBooks: 500,
    activeUsers: 150,
    booksBorrowed: 200,
};

// Function to update the dashboard stats on the page
function updateDashboard() {
    const totalBooksElement = document.getElementById("totalBooks") as HTMLElement;
    const activeUsersElement = document.getElementById("activeUsers") as HTMLElement;
    const booksBorrowedElement = document.getElementById("booksBorrowed") as HTMLElement;

    if (totalBooksElement) {
        totalBooksElement.innerText = stats.totalBooks.toString();
    }
    if (activeUsersElement) {
        activeUsersElement.innerText = stats.activeUsers.toString();
    }
    if (booksBorrowedElement) {
        booksBorrowedElement.innerText = stats.booksBorrowed.toString();
    }
}

// Initial call to update the dashboard
updateDashboard();
