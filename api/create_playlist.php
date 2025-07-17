<?php
// 新增使用者歌單 API
header('Content-Type: application/json');
require_once '../includes/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    $data = $_POST;
}

$user_id = $data['user_id'] ?? null;
$playname = $data['playname'] ?? null;
$playdescription = $data['playdescription'] ?? null;
$cover_url = $data['cover_url'] ?? null;

if (!$user_id || !$playname || !$playdescription || !$cover_url) {
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=music;port=3306', 'abuser', '1234');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $playlist_id = uniqid();
    $stmt = $pdo->prepare('INSERT INTO user_playlists (playlist_id, user_id, playname, playdescription, cover_url, created_at) VALUES (?, ?, ?, ?, ?, CURDATE())');
    $stmt->execute([$playlist_id, $user_id, $playname, $playdescription, $cover_url]);
    echo json_encode(['success' => true, 'playlist_id' => $playlist_id]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
