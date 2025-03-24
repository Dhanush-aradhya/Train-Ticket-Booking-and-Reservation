const express = require('express');
const path =require("path");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5500;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simulated user database
let users = [];

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

// Generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Verify Aadhar (simulated)
function verifyAadhar(aadharNumber) {
    return aadharNumber.length === 12 && !isNaN(aadharNumber);
}

// Sign Up
app.post('/signup', (req, res) => {
    const { username, age, phone, email, aadhar, password } = req.body;
    if (users.find(u => u.username === username || u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users.push({ username, age, phone, email, aadhar, password });
    res.json({ message: 'Account created successfully' });
});

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});