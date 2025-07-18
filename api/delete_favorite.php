<?php
// 刪除收藏歌曲 API
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$user_id = $_POST['user_id'] ?? '';
$song_id = $_POST['song_id'] ?? '';

if (!$user_id || !$song_id) {
    echo json_encode(['success' => false, 'message' => '缺少參數']);
    exit;
}

try {
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=music;charset=utf8', 'abuser', '1234', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    $sql = 'DELETE FROM user_favorites WHERE user_id = :user_id AND song_id = :song_id';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':song_id', $song_id);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => '刪除失敗或資料不存在']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
