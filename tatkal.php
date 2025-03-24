<?php
include 'db_connects1.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = NULL;  // Assuming id is auto-incremented
    $from = $_POST['from'];
    $to = $_POST['to'];
    $date = $_POST['date'];
    $class = $_POST['class'];
    $compartment = $_POST['compartment'];
    $passengers = $_POST['passengers'];
    $bookingType = $_POST['bookingType'];
    
    // Basic validation
    if ($from === $to) {
        echo "<script>alert('Source and destination cannot be the same.'); window.history.back();</script>";
        exit();
    }
    
    try {
        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO `booking` (id, `from`, `to`, date, class, compartment, passengers, bookingType) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("isssssis", $id, $from, $to, $date, $class, $compartment, $passengers, $bookingType);

        // Execute the statement
        if ($stmt->execute()) {
            echo "<script>
                alert('Booking successful!');
                window.location.href = 'dashboard.php';
            </script>";
        } else {
            // Handle database errors
            if ($conn->errno) {
                echo "<script>alert('Database error: " . $conn->error . "'); window.history.back();</script>";
            } else {
                echo "<script>alert('Error with your booking. Please try again.'); window.history.back();</script>";
            }
        }
        
        // Close the statement
        $stmt->close();
    } catch (Exception $e) {
        echo "<script>alert('An error occurred: " . $e->getMessage() . "'); window.history.back();</script>";
    }
    
    // Close connection
    $conn->close();
}
?>