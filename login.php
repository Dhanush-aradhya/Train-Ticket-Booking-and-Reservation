<?php
session_start();
include 'db_connects1.php';

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get username and password from the request
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Prepare SQL statement to retrieve user data
    $sql = "SELECT id, username, passwordd FROM user_info WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);

    // Execute the statement
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if a user with the given username exists
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verify the password - note: we're using plain text here as per your existing code
        // In a production system, you should use password_hash and password_verify
        if ($password == $user["passwordd"]) {
            // Set session variables
            $_SESSION["username"] = $user["username"];
            $_SESSION["user_id"] = $user["id"];
            $_SESSION["logged_in"] = true;
            
            // Redirect to dashboard
            header("Location: dashboard.php");
            exit();
        } else {
            // Return incorrect password message
            echo "<script>alert('Invalid credentials'); window.location.href='index.html';</script>";
        }
    } else {
        // Return user not found message
        echo "<script>alert('User not found'); window.location.href='index.html';</script>";
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
} else {
    // Return invalid request message
    echo "<script>alert('Invalid request'); window.location.href='index.html';</script>";
}
?>