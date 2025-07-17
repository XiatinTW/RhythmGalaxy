<?php
// 隨機取得 songs 資料表 10 首歌曲
header('Content-Type: application/json');

try {
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=music', 'abuser', '1234', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    $sql = 'SELECT song_id, title, artist, cover_url, audio_url, duration FROM songs ORDER BY RAND() LIMIT 10';
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $songs = $stmt->fetchAll();

    echo json_encode(['success' => true, 'songs' => $songs]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
