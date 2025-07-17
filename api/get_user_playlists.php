<?php
header('Content-Type: application/json');
require_once '../includes/db.php';

$user_id = $_GET['user_id'] ?? null;
if (!$user_id) {
    echo json_encode(['success' => false, 'error' => '缺少 user_id']);
    exit;
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=music;port=3306', 'abuser', '1234');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $pdo->prepare('SELECT playlist_id, playname FROM user_playlists WHERE user_id = ? ORDER BY created_at DESC');
    $stmt->execute([$user_id]);
    $playlists = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'data' => $playlists]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
