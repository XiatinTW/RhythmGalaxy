<?php
// ai/increase_play_count.php
header('Content-Type: application/json');
require_once '../includes/db.php';

if (!isset($_POST['song_id'])) {
    echo json_encode(['success' => false, 'error' => 'Missing song_id']);
    exit;
}
$song_id = $_POST['song_id'];

try {
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=music', 'abuser', '1234', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    $sql = 'UPDATE songs SET play_count = play_count + 1 WHERE song_id = :song_id';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':song_id', $song_id);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Song not found']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
