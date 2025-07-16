<?php
$host = 'localhost';
$db   = 'music';
$user = 'abuser';
$pass = '1234';
$charset = 'utf8mb4';
$port = 3306;

$dsn = "mysql:host=$host;dbname=$db;port=$port;charset=$charset";
try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    die('資料庫連線失敗: ' . $e->getMessage());
}
?>