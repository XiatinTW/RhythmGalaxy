---
applyTo: '*.sql'
---
# 目的
產生 MySQL 資料庫的新增、修改、刪除、查詢指令

# MYSQL 的資料庫 DDL
```sql
CREATE TABLE music_users (
    user_id VARCHAR(36) NOT NULL PRIMARY KEY COMMENT '使用者ID',
    username VARCHAR(24) NOT NULL COMMENT '帳號',
    email VARCHAR(100) NOT NULL COMMENT '電子信箱',
    password VARCHAR(255) NOT NULL COMMENT '密碼',
    created_at DATE NOT NULL COMMENT '註冊時間'
);

CREATE TABLE music_songs (
    song_id VARCHAR(36) NOT NULL PRIMARY KEY COMMENT '歌曲ID',
    artist VARCHAR(20) NOT NULL COMMENT '歌手',
    title VARCHAR(20) NOT NULL COMMENT '歌名',
    album VARCHAR(20) NOT NULL COMMENT '專輯名稱',
    genre VARCHAR(20) NOT NULL COMMENT '類型',
    duration INT(6) NOT NULL COMMENT '音樂長度',
    cover_url VARCHAR(100) NOT NULL COMMENT '封面圖片連結',
    audio_url VARCHAR(100) NOT NULL COMMENT 'mp3檔案連結',
    upload_time DATETIME NOT NULL COMMENT '上傳時間',
    play_count INT(11) NOT NULL COMMENT '播放次數',
    lyrics_url VARCHAR(100) NOT NULL COMMENT '歌詞連結'
);

CREATE TABLE music_play_history (
    history_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '播放紀錄ID',
    user_id VARCHAR(36) NOT NULL COMMENT '使用者ID',
    song_id VARCHAR(36) NOT NULL COMMENT '歌曲ID',
    played_at DATE NOT NULL COMMENT '播放時間',
    FOREIGN KEY (user_id) REFERENCES music_users(user_id),
    FOREIGN KEY (song_id) REFERENCES music_songs(song_id)
);

CREATE TABLE music_user_favorites (
    favorites_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '收藏編碼',
    user_id VARCHAR(36) NOT NULL COMMENT '使用者ID',
    song_id VARCHAR(36) NOT NULL COMMENT '歌曲ID',
    created_at DATE NOT NULL COMMENT '收藏時間',
    FOREIGN KEY (user_id) REFERENCES music_users(user_id),
    FOREIGN KEY (song_id) REFERENCES music_songs(song_id)
);

CREATE TABLE music_user_playlists (
    playlist_id VARCHAR(36) NOT NULL PRIMARY KEY COMMENT '歌單ID',
    user_id VARCHAR(36) NOT NULL COMMENT '使用者',
    playname VARCHAR(15) NOT NULL COMMENT '歌單名稱',
    playdescription TEXT NOT NULL COMMENT '簡介',
    cover_url VARCHAR(30) NOT NULL COMMENT '歌單封面',
    created_at DATE NOT NULL COMMENT '建立時間',
    FOREIGN KEY (user_id) REFERENCES music_users(user_id)
);

CREATE TABLE music_playlist_songs (
    playlist_id VARCHAR(36) NOT NULL COMMENT '歌單ID',
    song_id VARCHAR(36) NOT NULL COMMENT '歌曲ID',
    PRIMARY KEY (playlist_id, song_id),
    FOREIGN KEY (playlist_id) REFERENCES music_user_playlists(playlist_id),
    FOREIGN KEY (song_id) REFERENCES music_songs(song_id)
);

CREATE TABLE music_charts (
    charts_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '排行榜ID',
    chart_name VARCHAR(100) NOT NULL COMMENT '排行榜名稱',
    chart_type VARCHAR(50) NOT NULL COMMENT '排行榜型'
);

CREATE TABLE music_chart_songs (
    chart_id INT(11) NOT NULL COMMENT '排行榜ID',
    song_id VARCHAR(36) NOT NULL COMMENT '歌曲ID',
    position INT(11) NOT NULL COMMENT '名次',
    PRIMARY KEY (chart_id, song_id),
    FOREIGN KEY (chart_id) REFERENCES music_charts(charts_id),
    FOREIGN KEY (song_id) REFERENCES music_songs(song_id)
);