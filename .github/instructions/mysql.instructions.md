---
applyTo: '*.sql'
---
# 目的
產生 MySQL 資料庫的新增、修改、刪除、查詢指令

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