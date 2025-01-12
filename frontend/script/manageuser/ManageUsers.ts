interface User {
    name: string;
    email: string;
    role: string;
    status: string;
}

const users: User[] = [
    { name: "John Doe", email: "johndoe@example.com", role: "User", status: "Active" },
    { name: "Jane Smith", email: "janesmith@example.com", role: "Admin", status: "Active" },
];

// Function to render users in the table
function renderUsers() {
    const tbody = document.querySelector("tbody");
    if (!tbody) return;

    tbody.innerHTML = ""; // Clear existing rows

    users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.status}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="toggleStatus(${index})">${user.status === "Active" ? "Deactivate" : "Activate"}</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Delete</button>
            </td>`;
        tbody.appendChild(row);
    });
}

// Function to update localStorage
function updateLocalStorage() {
    localStorage.setItem("users", JSON.stringify(users));
}

// Function to toggle user status
function toggleStatus(index: number) {
    if (users[index]) {
        users[index].status = users[index].status === "Active" ? "Inactive" : "Active"; // Toggle status
        updateLocalStorage(); // Update localStorage
        renderUsers(); // Re-render the user list
    }
}

// Function to delete a user
function deleteUser(index: number) {
    if (users[index]) {
        users.splice(index, 1); // Remove user from the array
        updateLocalStorage(); // Update localStorage
        renderUsers(); // Re-render the user list
    }
}

// Function to add a new user
function addUser(event: Event) {
    event.preventDefault(); // Prevent form submission

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const roleInput = document.getElementById("role") as HTMLSelectElement;

    const newUser: User = {
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
const form = document.getElementById("addUserForm") as HTMLFormElement;
if (form) {
    form.addEventListener("submit", addUser);
}
