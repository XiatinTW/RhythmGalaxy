<?php
// 取得 hotlistmusic 排行榜歌曲（不需 chart_id 參數）
header('Content-Type: application/json');

try {
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=music', 'abuser', '1234', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    // 這裡請填入 hotlistmusic 的 chart_id
    $sql = 'SELECT cs.song_id, s.title, s.artist, s.cover_url, s.audio_url, s.duration
        FROM chart_songs cs
        JOIN songs s ON cs.song_id = s.song_id
        ORDER BY cs.position ASC';
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $songs = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $songs]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
