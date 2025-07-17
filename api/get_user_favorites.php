<?php
// ai/get_user_favorites.php
// 取得指定使用者的收藏歌曲列表
header('Content-Type: application/json; charset=utf-8');

// 假設前端會用 session 或 token 傳 user_id，這裡用 GET 參數示範
$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;
if (!$user_id) {
    echo json_encode(['error' => '缺少 user_id']);
    exit;
}

try {
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=music;charset=utf8', 'abuser', '1234', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    $sql = "SELECT s.song_id, s.title, s.artist, s.album, s.genre, s.duration, s.cover_url, s.audio_url, s.lyrics_url, s.play_count, uf.created_at
            FROM user_favorites uf
            JOIN songs s ON uf.song_id = s.song_id
            WHERE uf.user_id = :user_id
            ORDER BY uf.created_at DESC";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    $songs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'songs' => $songs]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}
