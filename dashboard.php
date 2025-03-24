<?php
session_start();

// Check if user is logged in
if (!isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] !== true) {
    // If not logged in, redirect to login page
    header("Location: index.html");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Train Reservation Dashboard</title>
    <link rel="stylesheet" href="dashboard.css" />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="container">
      <header>
        <h1>Welcome to Train Reservation System</h1>
        <p>Welcome, <?php echo htmlspecialchars($_SESSION["username"]); ?>!</p>
        <p>Choose an option to proceed</p>
      </header>
      <main>
        <div class="option-grid">
          <div class="option-card" id="booking">
            <img
              src="https://img.icons8.com/fluency/96/train-ticket.png"
              alt="Book Tickets"
            />
            <h2><a href="tatkal_1.html">Book Tickets</a></h2>
            <p>Book your train tickets (Regular & Tatkal)</p>
          </div>
          <div class="option-card" id="cancellation">
            <img
              src="https://img.icons8.com/fluency/96/cancel.png"
              alt="Cancellation"
            />
            <h2><a href="display.html">Cancellation</a></h2>
            <p>Cancel your booked tickets</p>
          </div>
          <div class="option-card" id="logout">
            <img
              src="https://img.icons8.com/fluency/96/exit.png"
              alt="Logout"
            />
            <h2><a href="logout.php">Logout</a></h2>
            <p>Sign out from your account</p>
          </div>
        </div>
      </main>
    </div>
  </body>
</html>