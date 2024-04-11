<?php
// Mensaje JSON para la API
$json = ["message" => "Welcome to CRUD Api"];

// Muestro el mensaje a la API
echo json_encode($json);

// Verificación de solicitud de creación de tarea
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['title']) && isset($_POST['idUser']) && isset($_POST['completed'])) {
    include "./api/createTask.php";
}
?>
