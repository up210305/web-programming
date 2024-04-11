<?php
include "./partials/Connection.php";

if(isset($_GET['idUser'])) {
    $idUser = $_GET['idUser'];

    try {
        $SQL = "SELECT * FROM task WHERE idUser = :idUser";
        $statement = $conn->prepare($SQL);
        $statement->execute(['idUser' => $idUser]);

        $tasks = $statement->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($tasks);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error al obtener las tareas del usuario: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'No se proporcionó un usuario ID']);
}
