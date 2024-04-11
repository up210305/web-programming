<?php
include "./partials/Connection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['title'];
    $completed = isset($_POST['completed']) ? 1 : 0;
    $idUser = $_POST['idUser'];

    try {
        $SQL = "INSERT INTO `task` (`title`, `completed`, `idUser`) VALUES (:title, :completed, :idUser)";
        $statement = $conn->prepare($SQL);
        $statement->execute(['title' => $title, 'completed' => $completed, 'idUser' => $idUser]);

        echo json_encode(['message' => 'Tarea creada con éxito']);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error al crear la tarea: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Método no permitido']);
}
?>
