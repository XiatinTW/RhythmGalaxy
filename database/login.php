<?php
header('Content-Type: application/json');
try {
    $pdo = new PDO('mysql:host=localhost;dbname=music;port=3306', 'abuser', '1234', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $stmt = $pdo->prepare('SELECT user_id FROM users WHERE email = :email AND password = :password');
    $stmt->execute([':email' => $email, ':password' => $password]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user) {
        echo json_encode(['status' => 1, 'user_id' => $user['user_id']]);
    } else {
        echo json_encode(['status' => 0]);
    }
} catch (Exception $e) {
    echo json_encode(['status' => -1, 'error' => $e->getMessage()]);
}
?>
