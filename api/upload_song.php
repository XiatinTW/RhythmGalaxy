<?php
header('Content-Type: application/json');

// 資料庫連線
try {
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=music', 'abuser', '1234', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (Exception $e) {
    echo json_encode(['status' => -1, 'error' => '資料庫連線失敗: ' . $e->getMessage()]);
    exit;
}

// 檢查必填欄位
$fields = ['title', 'artist', 'album', 'duration', 'genre', 'upload_time'];
foreach ($fields as $f) {
    if (empty($_POST[$f])) {
        echo json_encode(['status' => 0]);
        exit;
    }
}
if (!isset($_FILES['cover_url']) || !isset($_FILES['audio_url'])) {
    echo json_encode(['status' => 0]);
    exit;
}

// 產生 song_id
$song_id = substr(md5(uniqid(mt_rand(), true)), 0, 6);

// 檔案處理
$genre = $_POST['genre'];
$cover_dir = dirname(__DIR__) . "/uploads/cover/$genre";
$audio_dir = dirname(__DIR__) . "/uploads/audio/$genre";
if (!is_dir($cover_dir)) mkdir($cover_dir, 0777, true);
if (!is_dir($audio_dir)) mkdir($audio_dir, 0777, true);

$cover_ext = pathinfo($_FILES['cover_url']['name'], PATHINFO_EXTENSION);
$audio_ext = pathinfo($_FILES['audio_url']['name'], PATHINFO_EXTENSION);

$cover_filename = "{$song_id}_cover." . $cover_ext;
$audio_filename = "{$song_id}_audio." . $audio_ext;

$cover_path = "$cover_dir/$cover_filename";
$audio_path = "$audio_dir/$audio_filename";

// 檔案搬移
if (!move_uploaded_file($_FILES['cover_url']['tmp_name'], $cover_path)) {
    echo json_encode(['status' => -1, 'error' => '封面圖上傳失敗']);
    exit;
}
if (!move_uploaded_file($_FILES['audio_url']['tmp_name'], $audio_path)) {
    echo json_encode(['status' => -1, 'error' => '音樂檔上傳失敗']);
    exit;
}

// 資料庫寫入
try {
    $sql = "INSERT INTO songs (song_id, artist, title, album, genre, duration, cover_url, audio_url, upload_time, play_count)
            VALUES (:song_id, :artist, :title, :album, :genre, :duration, :cover_url, :audio_url, :upload_time, 0)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':song_id' => $song_id,
        ':artist' => $_POST['artist'],
        ':title' => $_POST['title'],
        ':album' => $_POST['album'],
        ':genre' => $genre,
        ':duration' => intval($_POST['duration']),
        ':cover_url' => "uploads/cover/$genre/$cover_filename",
        ':audio_url' => "uploads/audio/$genre/$audio_filename",
        ':upload_time' => $_POST['upload_time']
    ]);
    echo json_encode(['status' => 1]);
} catch (Exception $e) {
    echo json_encode(['status' => -1, 'error' => $e->getMessage()]);
}
?>