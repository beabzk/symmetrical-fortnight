
function handleLogin(event: Event): void {
    event.preventDefault();

    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const messageDiv = document.getElementById('message') as HTMLDivElement;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();


    if (!email || !password) {
        messageDiv.textContent = 'Please fill in both fields.';
        messageDiv.style.color = 'red'; 
        return;
    }

 
    console.log('Email:', email);
    console.log('Password:', password);


}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleLogin);
    }
});
