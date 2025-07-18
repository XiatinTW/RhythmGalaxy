<?php
header('Content-Type: application/json');
if (session_status() === PHP_SESSION_NONE) session_start();

$data = json_decode(file_get_contents('php://input'), true);
$playlist_id = $data['playlist_id'] ?? '';
$song_id = $data['song_id'] ?? '';

if (!$playlist_id || !$song_id) {
    echo json_encode(['success' => false, 'error' => '缺少參數']);
    exit;
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=music;port=3306;charset=utf8', 'abuser', '1234');
    // 檢查是否已存在
    $sql = "SELECT 1 FROM playlist_songs WHERE playlist_id = :playlist_id AND song_id = :song_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['playlist_id' => $playlist_id, 'song_id' => $song_id]);
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'error' => '歌曲已在歌單中']);
        exit;
    }
    // 新增
    $sql = "INSERT INTO playlist_songs (playlist_id, song_id) VALUES (:playlist_id, :song_id)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['playlist_id' => $playlist_id, 'song_id' => $song_id]);
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
