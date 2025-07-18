<?php
header('Content-Type: application/json');
// 從 cookie 取得 user_id
if (!isset($_COOKIE['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'No user_id in cookie']);
    exit;
}
$user_id = $_COOKIE['user_id'];
try {
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=music', 'abuser', '1234', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    // 取每首歌最新一筆播放紀錄，依播放時間排序
    $sql = "
        SELECT s.song_id, s.title, s.artist, s.cover_url, s.audio_url, s.duration, h.played_at
        FROM play_history h
        JOIN songs s ON h.song_id = s.song_id
        WHERE h.user_id = :user_id
        AND h.played_at = (
            SELECT MAX(h2.played_at)
            FROM play_history h2
            WHERE h2.user_id = h.user_id AND h2.song_id = h.song_id
        )
        ORDER BY h.played_at DESC
        LIMIT 20
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':user_id' => $user_id]);
    $songs = $stmt->fetchAll();
    echo json_encode(['success' => true, 'songs' => $songs]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
