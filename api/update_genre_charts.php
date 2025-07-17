<?php
// 依 genre 分類，將 songs 表中 play_count 最高的前 10 首歌存入 charts 與 chart_songs
header('Content-Type: application/json');

try {
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=music', 'abuser', '1234', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    // 取得所有 genre
    $genres = $pdo->query('SELECT DISTINCT genre FROM songs')->fetchAll();
    $result = [];
    foreach ($genres as $g) {
        $genre = $g['genre'];
        // 取得該 genre 下 play_count 最高的前 10 首歌
        $stmt = $pdo->prepare('SELECT song_id FROM songs WHERE genre = :genre ORDER BY play_count DESC LIMIT 10');
        $stmt->execute([':genre' => $genre]);
        $songs = $stmt->fetchAll();
        if (count($songs) === 0) continue;
        // 新增/取得 charts
        $chart_name = $genre . ' Top 10';
        $chart_type = $genre;
        // 先查有沒有這個 chart
        $stmt2 = $pdo->prepare('SELECT charts_id FROM charts WHERE chart_name = :chart_name AND chart_type = :chart_type');
        $stmt2->execute([':chart_name' => $chart_name, ':chart_type' => $chart_type]);
        $chart = $stmt2->fetch();
        if ($chart) {
            $chart_id = $chart['charts_id'];
            // 清空舊的 chart_songs
            $pdo->prepare('DELETE FROM chart_songs WHERE chart_id = :chart_id')->execute([':chart_id' => $chart_id]);
        } else {
            // 產生高唯一性 charts_id
            $chart_id = bin2hex(random_bytes(16));
            $pdo->prepare('INSERT INTO charts (charts_id, chart_name, chart_type) VALUES (:charts_id, :chart_name, :chart_type)')->execute([
                ':charts_id' => $chart_id,
                ':chart_name' => $chart_name,
                ':chart_type' => $chart_type
            ]);
            // 延遲 1 秒，減少短時間內重複
            sleep(1);
        }
        // 寫入 chart_songs
        $pos = 1;
        foreach ($songs as $row) {
            $pdo->prepare('INSERT INTO chart_songs (chart_id, song_id, position) VALUES (:chart_id, :song_id, :position)')
                ->execute([':chart_id' => $chart_id, ':song_id' => $row['song_id'], ':position' => $pos++]);
        }
        $result[] = ['genre' => $genre, 'chart_id' => $chart_id, 'count' => count($songs)];
    }
    echo json_encode(['success' => true, 'charts' => $result]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
