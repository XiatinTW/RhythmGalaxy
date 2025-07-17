-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2025-07-17 10:27:44
-- 伺服器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `music`
--

-- --------------------------------------------------------

--
-- 資料表結構 `charts`
--

DROP TABLE IF EXISTS `charts`;
CREATE TABLE `charts` (
  `charts_id` int(11) NOT NULL COMMENT '排行榜ID',
  `chart_name` varchar(100) NOT NULL COMMENT '排行榜名稱',
  `chart_type` varchar(50) NOT NULL COMMENT '排行類型'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `chart_songs`
--

DROP TABLE IF EXISTS `chart_songs`;
CREATE TABLE `chart_songs` (
  `chart_id` int(11) NOT NULL COMMENT '排行榜ID',
  `song_id` varchar(36) NOT NULL COMMENT '歌曲ID',
  `position` int(11) NOT NULL COMMENT '名次'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `playlist_songs`
--

DROP TABLE IF EXISTS `playlist_songs`;
CREATE TABLE `playlist_songs` (
  `playlist_id` varchar(36) NOT NULL COMMENT '歌單ID',
  `song_id` varchar(36) NOT NULL COMMENT '歌曲ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `play_history`
--

DROP TABLE IF EXISTS `play_history`;
CREATE TABLE `play_history` (
  `history_id` int(11) NOT NULL COMMENT '播放紀錄ID',
  `user_id` varchar(36) NOT NULL COMMENT '使用者ID',
  `song_id` varchar(36) NOT NULL COMMENT '歌曲ID',
  `played_at` date NOT NULL COMMENT '播放時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `songs`
--

DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs` (
  `song_id` varchar(36) NOT NULL COMMENT '識別碼',
  `artist` varchar(20) NOT NULL COMMENT '歌手',
  `title` varchar(20) NOT NULL COMMENT '歌名',
  `album` varchar(20) NOT NULL COMMENT '專輯名稱',
  `genre` varchar(20) NOT NULL COMMENT '類型',
  `duration` int(6) NOT NULL COMMENT '音樂長度',
  `cover_url` varchar(100) NOT NULL COMMENT '封面圖片連結',
  `audio_url` varchar(100) NOT NULL COMMENT 'mp3檔案連結',
  `upload_time` datetime(6) NOT NULL COMMENT '上架時間',
  `play_count` int(11) NOT NULL COMMENT '播放次數',
  `lyrics_url` varchar(100) NOT NULL COMMENT '歌詞'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `songs`
--

INSERT INTO `songs` (`song_id`, `artist`, `title`, `album`, `genre`, `duration`, `cover_url`, `audio_url`, `upload_time`, `play_count`, `lyrics_url`) VALUES
('1e439e', 'Kevin Lee', 'Echoes of You', 'Kevin Lee', 'R&B', 116, 'uploads/cover/R&B/1e439e_cover.jpg', 'uploads/audio/R&B/1e439e_audio.mp3', '2025-07-14 00:00:00.000000', 0, ''),
('c2876f', 'Ella Moon', 'Starlight Journey', 'Ella Moon', 'PoPMusic', 92, 'uploads/cover/PoPMusic/c2876f_cover.jpg', 'uploads/audio/PoPMusic/c2876f_audio.mp3', '2025-07-14 00:00:00.000000', 0, ''),
('c4fc52', 'Luna Black', 'Shadow Dance', 'Luna Black', 'Dance', 128, 'uploads/cover/Dance/c4fc52_cover.jpg', 'uploads/audio/Dance/c4fc52_audio.mp3', '2025-07-14 00:00:00.000000', 0, ''),
('eac9b5', 'Alex_MakeMusic', 'Gorila', 'MakeMusic', 'PoPMusic', 115, 'uploads/cover/PoPMusic/eac9b5_cover.jpg', 'uploads/audio/PoPMusic/eac9b5_audio.mp3', '2025-07-14 00:00:00.000000', 1, ''),
('ed089a', 'Emma Stone', 'Lost in the Sky', 'Emma Stone', 'PoPMusic', 152, 'uploads/cover/PoPMusic/ed089a_cover.jpg', 'uploads/audio/PoPMusic/ed089a_audio.mp3', '2025-07-14 00:00:00.000000', 3, '');

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` varchar(36) NOT NULL COMMENT '使用者ID',
  `username` varchar(24) NOT NULL COMMENT '帳號',
  `email` varchar(100) NOT NULL COMMENT '電子信箱',
  `password` varchar(255) NOT NULL COMMENT '密碼',
  `created_at` date NOT NULL COMMENT '註冊時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `created_at`) VALUES
('24f808f9d613ab53998c543a2d176276cf74', '測試員', '123@gmail.com', '1234', '2025-07-16');

-- --------------------------------------------------------

--
-- 資料表結構 `user_favorites`
--

DROP TABLE IF EXISTS `user_favorites`;
CREATE TABLE `user_favorites` (
  `favorites_id` int(11) NOT NULL COMMENT '收藏的編碼',
  `user_id` varchar(36) NOT NULL COMMENT '使用者ID',
  `song_id` varchar(36) NOT NULL COMMENT '歌曲ID',
  `created_at` date NOT NULL COMMENT '收藏時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `user_favorites`
--

INSERT INTO `user_favorites` (`favorites_id`, `user_id`, `song_id`, `created_at`) VALUES
(1, '24f808f9d613ab53998c543a2d176276cf74', 'eac9b5', '2025-07-17'),
(2, '24f808f9d613ab53998c543a2d176276cf74', 'c4fc52', '2025-07-17');

-- --------------------------------------------------------

--
-- 資料表結構 `user_playlists`
--

DROP TABLE IF EXISTS `user_playlists`;
CREATE TABLE `user_playlists` (
  `playlist_id` varchar(36) NOT NULL COMMENT '歌單ID',
  `playname` varchar(15) NOT NULL COMMENT '歌單名稱',
  `user_id` varchar(36) NOT NULL COMMENT '使用者',
  `playdescription` text NOT NULL COMMENT '簡介',
  `cover_url` varchar(30) NOT NULL COMMENT '歌單封面',
  `created_at` date NOT NULL COMMENT '建立時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `charts`
--
ALTER TABLE `charts`
  ADD PRIMARY KEY (`charts_id`),
  ADD UNIQUE KEY `charts_id` (`charts_id`),
  ADD KEY `chart_name` (`chart_name`);

--
-- 資料表索引 `chart_songs`
--
ALTER TABLE `chart_songs`
  ADD PRIMARY KEY (`chart_id`),
  ADD UNIQUE KEY `chart_id` (`chart_id`,`song_id`),
  ADD KEY `song_id` (`song_id`);

--
-- 資料表索引 `playlist_songs`
--
ALTER TABLE `playlist_songs`
  ADD UNIQUE KEY `playlist_id` (`playlist_id`,`song_id`),
  ADD KEY `song_id` (`song_id`);

--
-- 資料表索引 `play_history`
--
ALTER TABLE `play_history`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `history_id` (`history_id`,`user_id`,`song_id`),
  ADD KEY `song_id` (`song_id`);

--
-- 資料表索引 `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`song_id`),
  ADD UNIQUE KEY `song_id` (`song_id`),
  ADD KEY `title` (`title`,`artist`,`album`,`genre`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`username`,`email`);

--
-- 資料表索引 `user_favorites`
--
ALTER TABLE `user_favorites`
  ADD PRIMARY KEY (`favorites_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `song_id` (`song_id`);

--
-- 資料表索引 `user_playlists`
--
ALTER TABLE `user_playlists`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `playlist_id` (`playlist_id`,`user_id`),
  ADD KEY `PlayID` (`playlist_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user_favorites`
--
ALTER TABLE `user_favorites`
  MODIFY `favorites_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '收藏的編碼', AUTO_INCREMENT=3;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `chart_songs`
--
ALTER TABLE `chart_songs`
  ADD CONSTRAINT `chart_songs_ibfk_1` FOREIGN KEY (`chart_id`) REFERENCES `charts` (`charts_id`),
  ADD CONSTRAINT `chart_songs_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`);

--
-- 資料表的限制式 `playlist_songs`
--
ALTER TABLE `playlist_songs`
  ADD CONSTRAINT `playlist_songs_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`);

--
-- 資料表的限制式 `play_history`
--
ALTER TABLE `play_history`
  ADD CONSTRAINT `play_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `play_history_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`);

--
-- 資料表的限制式 `user_favorites`
--
ALTER TABLE `user_favorites`
  ADD CONSTRAINT `user_favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_favorites_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`);

--
-- 資料表的限制式 `user_playlists`
--
ALTER TABLE `user_playlists`
  ADD CONSTRAINT `user_playlists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_playlists_ibfk_2` FOREIGN KEY (`playlist_id`) REFERENCES `playlist_songs` (`playlist_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
