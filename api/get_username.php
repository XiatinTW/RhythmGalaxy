<?php
header('Content-Type: application/json');

$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : '';
if (!$user_id) {
    echo json_encode(['error' => 'No user_id']);
    exit;
}

try {
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=music', 'abuser', '1234');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare('SELECT username FROM users WHERE user_id = :user_id');
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row && !empty($row['username'])) {
        echo json_encode(['username' => $row['username']]);
    } else {
        echo json_encode(['username' => null]);
    }
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
