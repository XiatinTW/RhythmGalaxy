---
applyTo: 'ai/*.php'
---
# 目的
讓 php 跟 MySQL 連線，並且執行相關的 SQL 指令，對資料庫進行新增、修改、刪除、查詢

# 資料庫連接方式
- PDO
- host: localhost
- 帳號: abuser
- 密碼: 1234
- 埠號: 3306
- 資料庫名稱: addressbook

# SQL 字串與 PHP 變數
使用參數綁定方式綁定 SQL 與 PHP 變數

# PHP 輸出格式
JSON

# MYSQL 的資料庫 DDL
```sql
CREATE TABLE users (
    user_id VARCHAR(36) NOT NULL PRIMARY KEY,
    username VARCHAR(24) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL
);

CREATE TABLE songs (
    song_id VARCHAR(36) NOT NULL PRIMARY KEY,
    artist VARCHAR(20) NOT NULL,
    title VARCHAR(20) NOT NULL,
    album VARCHAR(20) NOT NULL,
    genre VARCHAR(20) NOT NULL,
    duration INT(6) NOT NULL,
    cover_url VARCHAR(30) NOT NULL,
    audio_url VARCHAR(30) NOT NULL,
    upload_time DATETIME NOT NULL,
    play_count INT(11) NOT NULL
);

CREATE TABLE user_playlists (
    playlist_id VARCHAR(36) NOT NULL PRIMARY KEY,
    playname VARCHAR(15) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    playdescription TEXT NOT NULL,
    cover_url VARCHAR(30) NOT NULL,
    created_at DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE playlist_songs (
    playlist_id VARCHAR(36) NOT NULL,
    song_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (playlist_id, song_id),
    FOREIGN KEY (playlist_id) REFERENCES user_playlists(playlist_id),
    FOREIGN KEY (song_id) REFERENCES songs(song_id)
);

CREATE TABLE play_history (
    history_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(36) NOT NULL,
    song_id VARCHAR(36) NOT NULL,
    played_at DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (song_id) REFERENCES songs(song_id)
);

CREATE TABLE user_favorites (
    favorites_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(36) NOT NULL,
    song_id VARCHAR(36) NOT NULL,
    created_at DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (song_id) REFERENCES songs(song_id)
);

CREATE TABLE charts (
    charts_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    chart_name VARCHAR(100) NOT NULL,
    chart_type VARCHAR(50) NOT NULL
);

CREATE TABLE chart_songs (
    chart_id INT(11) NOT NULL,
    song_id VARCHAR(36) NOT NULL,
    position INT(11) NOT NULL,
    PRIMARY KEY (chart_id, song_id),
    FOREIGN KEY (chart_id) REFERENCES charts(charts_id),
    FOREIGN KEY (song_id) REFERENCES songs(song_id)
);