<?php
header('Content-Type: application/json');
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// 取得 user_id（從 cookie 或 session）
$user_id = '';
if (isset($_COOKIE['user_id'])) {
    $user_id = $_COOKIE['user_id'];
} elseif (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
}
if (!$user_id) {
    echo json_encode(['success' => false, 'error' => '未登入']);
    exit;
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=music;port=3306;charset=utf8', 'abuser', '1234');
    $sql = "SELECT playlist_id, playname FROM user_playlists WHERE user_id = :user_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['user_id' => $user_id]);
    $playlists = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'playlists' => $playlists]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
