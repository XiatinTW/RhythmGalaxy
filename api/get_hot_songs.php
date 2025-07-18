<?php
// ai/get_hot_songs.php
header('Content-Type: application/json');
try {
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=music', 'abuser', '1234', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
    ]);
    $sql = "SELECT song_id, artist, title, album, genre, duration, cover_url, audio_url, play_count
            FROM songs
            ORDER BY play_count DESC
            LIMIT 10";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $hotSongs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'data' => $hotSongs]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
