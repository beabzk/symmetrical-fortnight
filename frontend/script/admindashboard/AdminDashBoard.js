// Initial mock data for the dashboard
var stats = {
    totalBooks: 500,
    activeUsers: 150,
    booksBorrowed: 200,
};
// Function to update the dashboard stats on the page
function updateDashboard() {
    var totalBooksElement = document.getElementById("totalBooks");
    var activeUsersElement = document.getElementById("activeUsers");
    var booksBorrowedElement = document.getElementById("booksBorrowed");
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
