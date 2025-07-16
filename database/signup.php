<?php
header('Content-Type: application/json');
try {
    $pdo = new PDO('mysql:host=localhost;dbname=music;port=3306', 'abuser', '1234', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    $username = $_POST['username'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    // 檢查 email 是否已存在
    $stmt = $pdo->prepare('SELECT user_id FROM users WHERE email = :email');
    $stmt->execute([':email' => $email]);
    if ($stmt->fetch()) {
        echo json_encode(['status' => 0]);
        exit;
    }
    // 產生 36 碼 user_id
    $user_id = bin2hex(random_bytes(18));
    $created_at = date('Y-m-d');
    $stmt = $pdo->prepare('INSERT INTO users (user_id, username, email, password, created_at) VALUES (:user_id, :username, :email, :password, :created_at)');
    $stmt->execute([
        ':user_id' => $user_id,
        ':username' => $username,
        ':email' => $email,
        ':password' => $password,
        ':created_at' => $created_at
    ]);
    echo json_encode(['status' => 1]);
} catch (Exception $e) {
    echo json_encode(['status' => -1, 'error' => $e->getMessage()]);
}
?>
