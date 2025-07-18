<?php
header('Content-Type: application/json');

try {
    $pdo = new PDO(
        'mysql:host=localhost;dbname=music;port=3306;charset=utf8',
        'abuser',
        '1234',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    // 取得查詢參數
    $artist = $_GET['artist'] ?? '';
    $title = $_GET['title'] ?? '';
    $genre = $_GET['genre'] ?? '';
    $sort = $_GET['sort'] ?? '';
    $order = strtolower($_GET['order'] ?? 'asc') === 'desc' ? 'DESC' : 'ASC';

    // 可排序欄位白名單
    $sortable = [
        'artist', 'title', 'album', 'genre', 'duration', 'upload_time'
    ];
    $sort = in_array($sort, $sortable) ? $sort : 'upload_time';

    // 組 SQL
    $sql = "SELECT artist, title, album, genre, duration, upload_time FROM songs WHERE 1";
    $params = [];

    if ($artist !== '') {
        $sql .= " AND artist LIKE :artist";
        $params[':artist'] = "%$artist%";
    }
    if ($title !== '') {
        $sql .= " AND title LIKE :title";
        $params[':title'] = "%$title%";
    }
    if ($genre !== '') {
        $sql .= " AND genre = :genre";
        $params[':genre'] = $genre;
    }

    $sql .= " ORDER BY $sort $order";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 處理 upload_time 只顯示日期，duration 轉 mm:ss
    foreach ($rows as &$row) {
        if (isset($row['upload_time'])) {
            $row['upload_time'] = substr($row['upload_time'], 0, 10);
        }
        if (isset($row['duration'])) {
            $min = floor($row['duration'] / 60);
            $sec = $row['duration'] % 60;
            $row['duration'] = sprintf('%02d:%02d', $min, $sec);
        }
    }

    echo json_encode([
        'status' => 0,
        'data' => $rows
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => -1,
        'error' => $e->getMessage()
    ]);
}
