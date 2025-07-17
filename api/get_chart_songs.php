<?php
// 取得排行榜歌曲 song_id
header('Content-Type: application/json');

try {
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=music', 'abuser', '1234', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    // 取得指定 chart_id 的歌曲，依 position 由小到大排序，並 join songs 取得完整資訊
    $chart_id = isset($_GET['chart_id']) ? $_GET['chart_id'] : '';
    if (!$chart_id) {
        echo json_encode(['success' => false, 'error' => 'Missing chart_id']);
        exit;
    }
    $sql = 'SELECT cs.song_id, s.title, s.artist, s.cover_url, s.audio_url, s.duration
            FROM chart_songs cs
            JOIN songs s ON cs.song_id = s.song_id
            WHERE cs.chart_id = :chart_id
            ORDER BY cs.position ASC';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['chart_id' => $chart_id]);
    $songs = $stmt->fetchAll();

    echo json_encode(['success' => true, 'songs' => $songs]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
