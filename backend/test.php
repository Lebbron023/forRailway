<?php
$host = 'localhost'; // Make sure this is the correct host
$dbname = 'if0_37703080_acts'; // Your database name
$username = 'if0_37703080'; // Your MySQL username
$password = 'tfhsYS6WFBhvkmZ '; // Your MySQL password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}