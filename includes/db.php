<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "music";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("資料庫連線失敗: " . $conn->connect_error);
}

?>