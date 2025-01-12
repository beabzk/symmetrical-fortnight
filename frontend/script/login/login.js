function handleLogin(event) {
    event.preventDefault();
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var messageDiv = document.getElementById('message');
    var email = emailInput.value.trim();
    var password = passwordInput.value.trim();
    if (!email || !password) {
        messageDiv.textContent = 'Please fill in both fields.';
        messageDiv.style.color = 'red';
        return;
    }
    console.log('Email:', email);
    console.log('Password:', password);
}
document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleLogin);
    }
});
