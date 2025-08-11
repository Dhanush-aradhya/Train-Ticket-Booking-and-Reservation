# Train Ticket Booking System

A web-based application for booking and managing train tickets, supporting both regular and Tatkal bookings. Built with PHP, MySQL, Node.js, and modern frontend technologies.

## Features
- User registration and login with captcha and Aadhar verification
- Book train tickets (choose stations, class, compartment, booking type
- Cancel booked tickets
- Dashboard for easy navigation
- Email/OTP logic (Node.js backend, for future integration)

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** PHP (main), Node.js/Express (for email/OTP simulation)
- **Database:** MySQL

## Folder Structure
- `*.php` — PHP backend scripts (booking, login, dashboard, etc.)
- `*.html` — Frontend pages
- `*.js` — Client-side scripts
- `*.css` — Stylesheets
- `server.js` — Node.js backend (for email/OTP, not fully integrated)
- `db_connects1.php` — Database connection config

## Setup Instructions

### Prerequisites
- PHP >= 7.x
- MySQL
- Node.js >= 14.x (for optional Node backend)

### 1. Database Setup
1. Create a MySQL database (default: `ttt`).
2. Create required tables (example for `user_info` and `booking`):

```sql
CREATE TABLE user_info (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  age INT,
  phone VARCHAR(15),
  email VARCHAR(100),
  aadhar VARCHAR(12),
  passwordd VARCHAR(255)
);

CREATE TABLE booking (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `from` VARCHAR(50),
  `to` VARCHAR(50),
  date DATE,
  class VARCHAR(10),
  compartment VARCHAR(20),
  passengers INT,
  bookingType VARCHAR(20)
);
```

3. Update `db_connects1.php` with your DB credentials if needed.

### 2. PHP Backend
- Place all files in your web server's root directory (e.g., `htdocs` for XAMPP).
- Start Apache/MySQL (if using XAMPP or similar).
- Access via `http://localhost/index.html`.

### 3. Node.js Backend (Optional, for email/OTP)
- Run `npm install` in the project root.
- Update email credentials in `server.js`.
- Start the server: `node server.js`
- The Node backend runs on port 5500 by default.

## Usage
- Register a new user via the Sign Up page.
- Log in to access the dashboard.
- Book or cancel tickets from the dashboard.
- (Optional) Integrate Node.js backend for OTP/email features.

## Security Notes
- Passwords are stored in plain text (for demo only). Use password hashing in production.
- No CSRF protection or input sanitization. Add these for real-world use.
- Database credentials are hardcoded. Use environment variables in production.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is for educational/demo purposes. Add a license if you plan to open source it.
