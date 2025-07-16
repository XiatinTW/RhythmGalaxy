<?php
// ai/get_song_info.php
header('Content-Type: application/json');
require_once '../includes/db.php'; // 請確保此檔案有 PDO 連線

$song_id = isset($_GET['song_id']) ? $_GET['song_id'] : '';
if (!$song_id) {
    echo json_encode(['error' => 'Missing song_id']);
    exit;
}

try {
    $stmt = $pdo->prepare('SELECT title, artist, audio_url, cover_url FROM songs WHERE song_id = :song_id');
    $stmt->bindParam(':song_id', $song_id);
    $stmt->execute();
    $song = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($song) {
        echo json_encode($song);
    } else {
        echo json_encode(['error' => 'Song not found']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
