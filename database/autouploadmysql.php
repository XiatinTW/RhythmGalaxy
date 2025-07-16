<?php
header('Content-Type: application/json');

$dbHost = 'localhost';
$dbUser = 'abuser';
$dbPass = '1234';
$dbName = 'music';
$dbPort = 3306;

// 備份檔案路徑
$backupFile = 'C:\\xampp\\htdocs\\RhythmGalaxy\\database\\music.sql';

try {
    // 連線 PDO
    $dsn = "mysql:host=$dbHost;port=$dbPort;dbname=$dbName;charset=utf8mb4";
    $pdo = new PDO($dsn, $dbUser, $dbPass);

    // 執行 mysqldump 指令
    $command = "mysqldump -h $dbHost -P $dbPort -u $dbUser -p$dbPass $dbName > \"$backupFile\"";
    exec($command, $output, $result);

    if ($result === 0) {
        echo json_encode([
            'success' => true,
            'message' => '備份成功',
            'file' => $backupFile
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => '備份失敗，請檢查權限或設定'
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => '資料庫連線失敗: ' . $e->getMessage()
    ]);
}
?>