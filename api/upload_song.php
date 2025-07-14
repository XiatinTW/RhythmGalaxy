<?php
include __DIR__ . '/../includes/db.php';

$title = $_POST['title'] ?? '';
$artist = $_POST['artist'] ?? '';
$album = $_POST['album'] ?? '';
$allowed_genres = ['Tw_Pop', 'Hip_Hop', 'Jazz', 'Jazz', 'K_Pop', 'J_Hop', 'EDM', 'Decades', 'RB', 'Soul', 'CountryMusic', 'DanceMusic'];
$genre = $_POST['genre'] ?? '';
if (!in_array($genre, $allowed_genres)) {
    die('⚠️ 錯誤：不接受的音樂類型');
}

$duration = intval($_POST['duration'] ?? 0);
$upload_time = $_POST['upload_time'] ?? '';


// 檔案儲存路徑
$cover_dir = 'uploads/cover/';
$audio_dir = 'uploads/audio/';
$cover_path = '';
$audio_path = '';
// 上傳封面圖
if (isset($_FILES['cover_file']) && $_FILES['cover_file']['error'] === UPLOAD_ERR_OK) {
    $cover_tmp = $_FILES['cover_file']['tmp_name'];
    $cover_name = uniqid('cover_') . '_' . basename($_FILES['cover_file']['name']);
    $cover_path = $cover_dir . $cover_name;
    move_uploaded_file($cover_tmp, $cover_path);
}
// 上傳音樂檔
if (isset($_FILES['audio_file']) && $_FILES['audio_file']['error'] === UPLOAD_ERR_OK) {
    $audio_tmp = $_FILES['audio_file']['tmp_name'];
    $audio_name = uniqid('audio_') . '_' . basename($_FILES['audio_file']['name']);
    $audio_path = $audio_dir . $audio_name;
    move_uploaded_file($audio_tmp, $audio_path);
}
// 檢查是否有成功取得檔案路徑
if (!$cover_path || !$audio_path) {
    die("❌ 檔案上傳失敗");
}


$sql = "INSERT INTO songs (title, artist, album, genre, duration, cover_url, audio_url, upload_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssisss", $title, $artist, $album, $genre, $duration, $cover_path, $audio_path, $upload_time);

if ($stmt->execute()) {
    echo "成功新增歌曲";
} else {
    echo "錯誤:" . $stmt->error;
}
?>