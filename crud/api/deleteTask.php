<?php
include "./partials/Connection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];

    try {
        $SQL = "DELETE FROM `task` WHERE `id` = :id";
        $statement = $conn->prepare($SQL);
        $statement->execute(['id' => $id]);

        echo json_encode(['message' => 'Tarea eliminada con éxito']);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error al eliminar la tarea: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Método no permitido']);
}
