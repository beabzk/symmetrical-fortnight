var users = [
    { name: "John Doe", email: "johndoe@example.com", role: "User", status: "Active" },
    { name: "Jane Smith", email: "janesmith@example.com", role: "Admin", status: "Active" },
];
// Function to render users in the table
function renderUsers() {
    var tbody = document.querySelector("tbody");
    if (!tbody)
        return;
    tbody.innerHTML = ""; // Clear existing rows
    users.forEach(function (user, index) {
        var row = document.createElement("tr");
        row.innerHTML = "\n            <td>".concat(user.name, "</td>\n            <td>").concat(user.email, "</td>\n            <td>").concat(user.role, "</td>\n            <td>").concat(user.status, "</td>\n            <td>\n                <button class=\"btn btn-warning btn-sm\" onclick=\"toggleStatus(").concat(index, ")\">").concat(user.status === "Active" ? "Deactivate" : "Activate", "</button>\n                <button class=\"btn btn-danger btn-sm\" onclick=\"deleteUser(").concat(index, ")\">Delete</button>\n            </td>");
        tbody.appendChild(row);
    });
}
// Function to update localStorage
function updateLocalStorage() {
    localStorage.setItem("users", JSON.stringify(users));
}
// Function to toggle user status
function toggleStatus(index) {
    if (users[index]) {
        users[index].status = users[index].status === "Active" ? "Inactive" : "Active"; // Toggle status
        updateLocalStorage(); // Update localStorage
        renderUsers(); // Re-render the user list
    }
}
// Function to delete a user
function deleteUser(index) {
    if (users[index]) {
        users.splice(index, 1); // Remove user from the array
        updateLocalStorage(); // Update localStorage
        renderUsers(); // Re-render the user list
    }
}
// Function to add a new user
function addUser(event) {
    event.preventDefault(); // Prevent form submission
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var roleInput = document.getElementById("role");
    var newUser = {
        name: nameInput.value,
        email: emailInput.value,
        role: roleInput.value,
        status: "Active", // Default status
    };
    users.push(newUser); // Add new user to the array
    updateLocalStorage(); // Update localStorage
    renderUsers(); // Re-render the user list
    // Clear input fields
    nameInput.value = "";
    emailInput.value = "";
    roleInput.value = "";
}
// Initial rendering of users
renderUsers();
// Add event listener for the form submission
var form = document.getElementById("addUserForm");
if (form) {
    form.addEventListener("submit", addUser);
}
