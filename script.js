// script.js - Client-side logic for Train Ticket Booking System
// Handles captcha, login, signup, and form validation

// Generate a random captcha
function generateCaptcha() {
    return Math.random().toString(36).substr(2, 6);
}

// Show captcha on the page
function showCaptcha() {
    const captchaText = document.getElementById('captchaText');
    if (captchaText) {
        captchaText.textContent = generateCaptcha();
    }
}

// Login
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const captchaInput = document.getElementById('captchaInput').value;

    if (captchaInput !== document.getElementById('captchaText').textContent) {
        alert('Incorrect captcha');
        return;
    }

    fetch('http://localhost:5500/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.message === 'Login successful') {
            // Redirect to dashboard or home page
            // window.location.href = 'dashboard.html';
        }
    })
    .catch(error => console.error('Error:', error));
});

// Sign Up
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const age = document.getElementById('age').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const aadhar = document.getElementById('aadhar').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const captchaInput = document.getElementById('captchaInput').value;
    
    function verifyAadhar(aadharNumber){
        return aadharNumber.length===12 && !isNaN(aadharNumber);
    }


    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }

    function verifyPassword(password) {
        // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character in any order
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
        return passwordRegex.test(password);
    }
    
    if (!verifyPassword(password)) {
        alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
        return;
    }

    if (captchaInput !== document.getElementById('captchaText').textContent) {
        alert('Incorrect captcha');
        return;
    }

    /*fetch('http://localhost:5500/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, age, phone, email, aadhar, password })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.message === 'Account created successfully') {
            window.location.href = 'index.html';
        }
    })
    .catch(error => console.error('Error:', error));*/
    alert('Account created successfully');
    
});

// Verify Aadhar
document.getElementById('verifyAadhar')?.addEventListener('click', function() {
    const aadhar = document.getElementById('aadhar').value;
    
    fetch('http://localhost:5500/verify-aadhar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aadhar })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
});

// Initialize captcha on page load
window.addEventListener('load', showCaptcha);