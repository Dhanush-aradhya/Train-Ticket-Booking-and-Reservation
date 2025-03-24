<?php
include 'db_connects1.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = NULL;  // Assuming id is auto-incremented and not provided by the user
    $username = $_POST['username'];
    $age = $_POST['age'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $aadhar = $_POST['aadhar'];
    $passwordd = $_POST['password'];

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO `user_info` (id, username, age, phone, email, aadhar, passwordd) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isiisis", $id, $username, $age, $phone, $email, $aadhar, $passwordd);

    // Execute the statement
    if ($stmt->execute()) {
        echo "<script>alert('Record inserted successfully.');</script>";
    } else {
        echo "<script>alert('Error: " . $stmt->error . "');</script>";
    }
    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>
