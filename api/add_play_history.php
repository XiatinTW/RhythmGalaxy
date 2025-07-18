<?php
// 觀聽紀錄 API：將播放紀錄寫入 play_history 資料表
header('Content-Type: application/json');

// 檢查登入（假設 user_id 來自 cookie）

// 從 cookie 取得 user_id
$user_id = $_COOKIE['user_id'] ?? null;
if (!$user_id) {
    echo json_encode(['success' => false, 'error' => '未登入']);
    exit;
}

// 取得 POST 參數
$data = json_decode(file_get_contents('php://input'), true);
$song_id = $data['song_id'] ?? null;
if (!$song_id) {
    echo json_encode(['success' => false, 'error' => '缺少 song_id']);
    exit;
}

$played_at = date('Y-m-d H:i:s');

try {
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=music', 'abuser', '1234', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    // 刪除舊的 user_id+song_id 紀錄
    $del = $pdo->prepare('DELETE FROM play_history WHERE user_id = :user_id AND song_id = :song_id');
    $del->execute([
        ':user_id' => $user_id,
        ':song_id' => $song_id
    ]);
    // 新增最新一筆
    $sql = 'INSERT INTO play_history (user_id, song_id, played_at) VALUES (:user_id, :song_id, :played_at)';
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':user_id' => $user_id,
        ':song_id' => $song_id,
        ':played_at' => $played_at
    ]);
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
