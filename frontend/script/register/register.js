function checkRegistration(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('Confirmpassword').value;
    const terms = document.getElementById('terms').checked;
    const userType = document.getElementById('userType').value;

    // Validate inputs
    if (!name || !email || !password || !confirmPassword || !terms || !userType) {
        alert('Please fill in all fields and accept the terms and conditions');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Create user object
    const userData = {
        name: name,
        email: email,
        password: password,
        userRole: userType === 'admin' ? 'ADMIN' : 'USER'
    };

    // Send registration request
    fetch('http://localhost:3333/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: 'include' // Include credentials in the request
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    })
    .then(data => {
        console.log('Registration successful:', data);
        alert('Registration successful!');
        window.location.href = 'login.html';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Registration failed: ' + (error.message || 'Please try again'));
    });
}