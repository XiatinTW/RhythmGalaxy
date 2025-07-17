<?php
// Rhythm Galaxy - 新增收藏API
header('Content-Type: application/json');
require_once '../includes/db.php';

// 取得user_id from cookie
if (!isset($_COOKIE['user_id'])) {
    echo json_encode(['success' => false, 'error' => '未登入']);
    exit;
}
$user_id = $_COOKIE['user_id'];

// 取得song_id from POST
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['song_id'])) {
    echo json_encode(['success' => false, 'error' => '缺少歌曲ID']);
    exit;
}
$song_id = $data['song_id'];


$created_at = date('Y-m-d');

// 檢查是否已經收藏過該歌曲
try {
    $pdo = new PDO('mysql:host=localhost;dbname=music;port=3306;charset=utf8', 'abuser', '1234');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $checkSql = 'SELECT favorites_id FROM user_favorites WHERE user_id = :user_id AND song_id = :song_id';
    $checkStmt = $pdo->prepare($checkSql);
    $checkStmt->bindParam(':user_id', $user_id);
    $checkStmt->bindParam(':song_id', $song_id);
    $checkStmt->execute();
    if ($checkStmt->fetch()) {
        echo json_encode(['success' => false, 'error' => '已經收藏過此歌曲']);
        exit;
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    exit;
}

try {
    // $pdo 已於上方建立
    $sql = 'INSERT INTO user_favorites (user_id, song_id, created_at) VALUES (:user_id, :song_id, :created_at)';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':song_id', $song_id);
    $stmt->bindParam(':created_at', $created_at);
    $stmt->execute();
    $favorites_id = $pdo->lastInsertId();
    echo json_encode(['success' => true, 'favorites_id' => $favorites_id]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
