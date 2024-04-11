<?php
$json = ["message" => "Welcome to CRUD Api"];

echo json_encode($json);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['title']) && isset($_POST['idUser']) && isset($_POST['completed'])) {
    include "./api/createTask.php";
}
?>
