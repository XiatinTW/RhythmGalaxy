<?php
header('Content-Type: application/json');
try {
    $pdo = new PDO('mysql:host=localhost;dbname=music;port=3306;charset=utf8', 'abuser', '1234');
    $stmt = $pdo->query('SELECT title FROM songs');
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
} catch (Exception $e) {
    echo json_encode([]);
}
