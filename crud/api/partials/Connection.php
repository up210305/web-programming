<?php

$host = "localhost";
$dbName = "todoApp";
$user = "root";
//$password = "1810";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbName", $user);//, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión a la base de datos: " . $e->getMessage());
}
