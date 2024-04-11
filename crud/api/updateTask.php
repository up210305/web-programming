<?php
include "./partials/Connection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $title = $_POST['title'];
    $completed = isset($_POST['completed']) ? 1 : 0;

    try {
        $SQL = "UPDATE `task` SET `title` = :title, `completed` = :completed WHERE `id` = :id";
        $statement = $conn->prepare($SQL);
        $statement->execute(['id' => $id, 'title' => $title, 'completed' => $completed]);

        echo json_encode(['message' => 'Tarea actualizada con éxito']);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error al actualizar la tarea: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Método no permitido']);
}
?>
