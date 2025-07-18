<?php
header('Content-Type: application/json');
if (!isset($_GET['playlist_id'])) {
    echo json_encode(['success'=>false, 'msg'=>'缺少 playlist_id']);
    exit;
}
$playlist_id = $_GET['playlist_id'];
try {
    $pdo = new PDO('mysql:host=localhost;dbname=music;port=3306;charset=utf8', 'abuser', '1234');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 取得歌單名稱
    $stmt = $pdo->prepare('SELECT playname FROM user_playlists WHERE playlist_id = :playlist_id');
    $stmt->execute([':playlist_id' => $playlist_id]);
    $playlist = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$playlist) {
        echo json_encode(['success'=>false, 'msg'=>'歌單不存在']);
        exit;
    }

    // 取得歌單歌曲
    $stmt = $pdo->prepare('
        SELECT s.song_id, s.artist, s.title, s.cover_url, s.duration
        FROM playlist_songs ps
        JOIN songs s ON ps.song_id = s.song_id
        WHERE ps.playlist_id = :playlist_id
    ');
    $stmt->execute([':playlist_id' => $playlist_id]);
    $songs = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'playname' => $playlist['playname'],
        'songs' => $songs
    ]);
} catch (Exception $e) {
    echo json_encode(['success'=>false, 'msg'=>'資料庫錯誤']);
}
