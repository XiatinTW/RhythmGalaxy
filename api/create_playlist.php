<?php
// 新增使用者歌單 API
header('Content-Type: application/json');
require_once '../includes/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
    exit;
}


// 支援 multipart/form-data 圖片上傳

$user_id = $_POST['user_id'] ?? null;
$playname = $_POST['playname'] ?? null;
$playdescription = $_POST['playdescription'] ?? null;
$cover_url = null;
$playlist_id = uniqid();

// 檢查封面圖檔案
if (isset($_FILES['cover_file']) && $_FILES['cover_file']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = __DIR__ . '/../uploads/play_cover/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    $ext = pathinfo($_FILES['cover_file']['name'], PATHINFO_EXTENSION);
    $filename = $playlist_id . '_cover.' . $ext;
    $targetPath = $uploadDir . $filename;
    if (move_uploaded_file($_FILES['cover_file']['tmp_name'], $targetPath)) {
        $cover_url = 'uploads/play_cover/' . $filename;
    } else {
        echo json_encode(['success' => false, 'error' => '封面圖片上傳失敗']);
        exit;
    }
} else {
    echo json_encode(['success' => false, 'error' => '缺少封面圖片']);
    exit;
}

if (!$user_id || !$playname || !$playdescription || !$cover_url) {
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=music;port=3306', 'abuser', '1234');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $pdo->prepare('INSERT INTO user_playlists (playlist_id, user_id, playname, playdescription, cover_url, created_at) VALUES (?, ?, ?, ?, ?, CURDATE())');
    $stmt->execute([$playlist_id, $user_id, $playname, $playdescription, $cover_url]);
    echo json_encode(['success' => true, 'playlist_id' => $playlist_id]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
