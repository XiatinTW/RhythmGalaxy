<?php
header('Content-Type: application/json');
$keyword = isset($_GET['keyword']) ? trim($_GET['keyword']) : '';
if ($keyword === '') {
    echo json_encode(['success' => false, 'songs' => []]);
    exit;
}
try {
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=music', 'abuser', '1234', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    $sql = 'SELECT song_id, title, artist, cover_url, duration FROM songs WHERE title LIKE :kw OR artist LIKE :kw LIMIT 20';
    $stmt = $pdo->prepare($sql);
    $kw = '%' . $keyword . '%';
    $stmt->bindParam(':kw', $kw, PDO::PARAM_STR);
    $stmt->execute();
    $songs = $stmt->fetchAll();
    echo json_encode(['success' => true, 'songs' => $songs]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
