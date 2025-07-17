-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2025-07-17 17:21:10
-- 伺服器版本： 10.4.32-MariaDB
-- PHP 版本： 8.0.30

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
  `charts_id` varchar(36) NOT NULL COMMENT '排行榜ID',
  `chart_name` varchar(100) NOT NULL COMMENT '排行榜名稱',
  `chart_type` varchar(50) NOT NULL COMMENT '排行類型'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `charts`
--

INSERT INTO `charts` (`charts_id`, `chart_name`, `chart_type`) VALUES
('0dd132e960381e6e0e49382678378d54', 'Hip-Hop Top 10', 'Hip-Hop'),
('1b8975086cca2333aaf8663f35b23649', 'R&B Top 10', 'R&B'),
('242180306893d36a016dc77799a55354', 'J-Pop Top 10', 'J-Pop'),
('8ba9a118b8a4d1b6054a936be94e2338', 'Dance Top 10', 'Dance'),
('8ea69533c1a83ce6e0847a1598e6b7f9', 'Jazz Top 10', 'Jazz'),
('c73cf3cbc64debbc49049a178fd4eb0b', 'PoPMusic Top 10', 'PoPMusic');

-- --------------------------------------------------------

--
-- 資料表結構 `chart_songs`
--

DROP TABLE IF EXISTS `chart_songs`;
CREATE TABLE `chart_songs` (
  `chart_id` varchar(36) NOT NULL COMMENT '排行榜ID',
  `song_id` varchar(36) NOT NULL COMMENT '歌曲ID',
  `position` int(11) NOT NULL COMMENT '名次'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `chart_songs`
--

INSERT INTO `chart_songs` (`chart_id`, `song_id`, `position`) VALUES
('8ea69533c1a83ce6e0847a1598e6b7f9', '01ac5a', 2),
('c73cf3cbc64debbc49049a178fd4eb0b', '06eb6d', 6),
('0dd132e960381e6e0e49382678378d54', '104452', 2),
('0dd132e960381e6e0e49382678378d54', '14e43b', 3),
('1b8975086cca2333aaf8663f35b23649', '1e439e', 1),
('c73cf3cbc64debbc49049a178fd4eb0b', '344e11', 9),
('0dd132e960381e6e0e49382678378d54', '358f20', 4),
('8ea69533c1a83ce6e0847a1598e6b7f9', '3c393c', 3),
('8ea69533c1a83ce6e0847a1598e6b7f9', '41cdff', 1),
('c73cf3cbc64debbc49049a178fd4eb0b', '440b77', 4),
('c73cf3cbc64debbc49049a178fd4eb0b', '449cce', 2),
('8ea69533c1a83ce6e0847a1598e6b7f9', '54e6f2', 4),
('8ea69533c1a83ce6e0847a1598e6b7f9', '620bbe', 5),
('8ea69533c1a83ce6e0847a1598e6b7f9', '78e123', 6),
('0dd132e960381e6e0e49382678378d54', '84e012', 5),
('242180306893d36a016dc77799a55354', '946b71', 1),
('0dd132e960381e6e0e49382678378d54', '999f0c', 1),
('c73cf3cbc64debbc49049a178fd4eb0b', 'aa0b6d', 3),
('0dd132e960381e6e0e49382678378d54', 'ac89d4', 6),
('8ea69533c1a83ce6e0847a1598e6b7f9', 'ad7cbf', 7),
('c73cf3cbc64debbc49049a178fd4eb0b', 'c2876f', 8),
('8ba9a118b8a4d1b6054a936be94e2338', 'c4fc52', 1),
('8ea69533c1a83ce6e0847a1598e6b7f9', 'd93f99', 8),
('0dd132e960381e6e0e49382678378d54', 'e65e65', 7),
('c73cf3cbc64debbc49049a178fd4eb0b', 'eac9b5', 1),
('c73cf3cbc64debbc49049a178fd4eb0b', 'ed089a', 5),
('0dd132e960381e6e0e49382678378d54', 'f3bcc1', 8),
('c73cf3cbc64debbc49049a178fd4eb0b', 'f4cf42', 7),
('c73cf3cbc64debbc49049a178fd4eb0b', 'fb69f8', 10);

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
('01ac5a', 'shanghaistoneman', '出去走走吧', 'shanghaistoneman', 'Jazz', 191, 'uploads/cover/PoPMusic/01ac5a_cover.jpg', 'uploads/audio/PoPMusic/01ac5a_audio.mp3', '2025-07-15 00:00:00.000000', 72, ''),
('06eb6d', 'AlexGrohl', 'Indie Rock', 'AlexGrohl', 'PoPMusic', 150, 'uploads/cover/PoPMusic/06eb6d_cover.jpg', 'uploads/audio/PoPMusic/06eb6d_audio.mp3', '2025-07-15 00:00:00.000000', 0, ''),
('104452', 'StudioKolomna', 'Winning Is Easy', 'StudioKolomna', 'Hip-Hop', 78, 'uploads/cover/Hip-Hop/104452_cover.jpg', 'uploads/audio/Hip-Hop/104452_audio.mp3', '2025-07-15 00:00:00.000000', 0, ''),
('14e43b', 'lNPLUSMUSIC', 'Hip Hop Vlog', 'lNPLUSMUSIC', 'Hip-Hop', 117, 'uploads/cover/Hip-Hop/14e43b_cover.jpg', 'uploads/audio/Hip-Hop/14e43b_audio.mp3', '2025-07-15 00:00:00.000000', 0, ''),
('1e439e', 'Kevin Lee', 'Echoes of You', 'Kevin Lee', 'R&B', 116, 'uploads/cover/R&B/1e439e_cover.jpg', 'uploads/audio/R&B/1e439e_audio.mp3', '2025-07-14 00:00:00.000000', 0, ''),
('344e11', 'LacoreDiamond', 'Lacore Diamond - Sun', 'LacoreDiamond', 'PoPMusic', 285, 'uploads/cover/PoPMusic/344e11_cover.jpg', 'uploads/audio/PoPMusic/344e11_audio.mp3', '2025-07-15 00:00:00.000000', 0, ''),
('358f20', 'SoulProdMusic', 'Smoke', 'SoulProdMusic', 'Hip-Hop', 119, 'uploads/cover/Hip-Hop/358f20_cover.jpg', 'uploads/audio/Hip-Hop/358f20_audio.mp3', '2025-07-15 00:00:00.000000', 0, ''),
('3c393c', 'Library', 'Velvet Steps', 'Library', 'Jazz', 240, 'uploads/cover/Jazz/3c393c_cover.jpg', 'uploads/audio/Jazz/3c393c_audio.mp3', '2025-07-15 00:00:00.000000', 0, ''),
('41cdff', 'jumpingbunny', 'WE JAZZ', 'jumpingbunny', 'Jazz', 186, 'uploads/cover/Jazz/41cdff_cover.jpg', 'uploads/audio/Jazz/41cdff_audio.mp3', '2025-07-15 00:00:00.000000', 76, ''),
('440b77', 'JuliusH', 'Fly Up To The Sky', 'JuliusH', 'PoPMusic', 52, 'uploads/cover/PoPMusic/440b77_cover.jpg', 'uploads/audio/PoPMusic/440b77_audio.mp3', '2025-07-15 00:00:00.000000', 70, ''),
('449cce', 'Dulandor', 'Pulse Revolution', 'Dulandor', 'PoPMusic', 169, 'uploads/cover/PoPMusic/449cce_cover.jpg', 'uploads/audio/PoPMusic/449cce_audio.mp3', '2025-07-15 00:00:00.000000', 80, ''),
('54e6f2', 'Onoychenko', 'Coastal Melody', 'Onoychenko', 'Jazz', 211, 'uploads/cover/Jazz/54e6f2_cover.jpg', 'uploads/audio/Jazz/54e6f2_audio.mp3', '2025-07-15 00:00:00.000000', 0, ''),
('620bbe', 'HappinessInMusic', 'Smooth Jazz', 'HappinessInMusic', 'Jazz', 262, 'uploads/cover/Jazz/620bbe_cover.jpg', 'uploads/audio/Jazz/620bbe_audio.mp3', '2025-07-15 00:00:00.000000', 0, ''),
('78e123', 'lkoliks', 'Lounge Elevator', 'lkoliks', 'Jazz', 88, 'uploads/cover/Jazz/78e123_cover.jpg', 'uploads/audio/Jazz/78e123_audio.mp3', '2025-07-15 00:00:00.000000', 0, ''),
('84e012', 'Pumpupthemind', 'Once In Paris', 'Pumpupthemind', 'Hip-Hop', 132, 'uploads/cover/Hip-Hop/84e012_cover.jpg', 'uploads/audio/Hip-Hop/84e012_audio.mp3', '2025-07-15 00:00:00.000000', 0, ''),
('946b71', 'GenosseMajor', 'イザナギとイザナミの歌', 'GenosseMajor', 'J-Pop', 208, 'uploads/cover/J-Pop/946b71_cover.jpg', 'uploads/audio/J-Pop/946b71_audio.mp3', '2025-07-15 00:00:00.000000', 78, ''),
('999f0c', 'Rockot', 'Experimental Cinemat', 'Rockot', 'Hip-Hop', 140, 'uploads/cover/Hip-Hop/999f0c_cover.jpg', 'uploads/audio/Hip-Hop/999f0c_audio.mp3', '2025-07-15 00:00:00.000000', 83, ''),
('aa0b6d', 'KELLEPICS', 'I\'M JEALOUS', 'KELLEPICS', 'PoPMusic', 324, 'uploads/cover/PoPMusic/aa0b6d_cover.jpg', 'uploads/audio/PoPMusic/aa0b6d_audio.mp3', '2025-07-15 00:00:00.000000', 74, ''),
('ac89d4', 'AlexGrohl', 'Sad Soul', 'AlexGrohl', 'Hip-Hop', 117, 'uploads/cover/Hip-Hop/ac89d4_cover.jpg', 'uploads/audio/Hip-Hop/ac89d4_audio.mp3', '2025-07-15 00:00:00.000000', 0, ''),
('ad7cbf', 'HappinessInMusic', 'Romantic Jazz', 'HappinessInMusic', 'Jazz', 257, 'uploads/cover/Jazz/ad7cbf_cover.jpg', 'uploads/audio/Jazz/ad7cbf_audio.mp3', '2025-07-15 00:00:00.000000', 0, ''),
('c2876f', 'Ella Moon', 'Starlight Journey', 'Ella Moon', 'PoPMusic', 92, 'uploads/cover/PoPMusic/c2876f_cover.jpg', 'uploads/audio/PoPMusic/c2876f_audio.mp3', '2025-07-14 00:00:00.000000', 0, ''),
('c4fc52', 'Luna Black', 'Shadow Dance', 'Luna Black', 'Dance', 128, 'uploads/cover/Dance/c4fc52_cover.jpg', 'uploads/audio/Dance/c4fc52_audio.mp3', '2025-07-14 00:00:00.000000', 85, ''),
('d93f99', 'TokyoRifft', 'Jazz at Dizzy\'s', 'TokyoRifft', 'Jazz', 294, 'uploads/cover/Jazz/d93f99_cover.jpg', 'uploads/audio/Jazz/d93f99_audio.mp3', '2025-07-15 00:00:00.000000', 0, ''),
('e65e65', 'Tunetank', 'Movements', 'Tunetank', 'Hip-Hop', 121, 'uploads/cover/Hip-Hop/e65e65_cover.jpg', 'uploads/audio/Hip-Hop/e65e65_audio.mp3', '2025-07-15 00:00:00.000000', 0, ''),
('eac9b5', 'Alex_MakeMusic', 'Gorila', 'MakeMusic', 'PoPMusic', 115, 'uploads/cover/PoPMusic/eac9b5_cover.jpg', 'uploads/audio/PoPMusic/eac9b5_audio.mp3', '2025-07-14 00:00:00.000000', 100, ''),
('ed089a', 'Emma Stone', 'Lost in the Sky', 'Emma Stone', 'PoPMusic', 152, 'uploads/cover/PoPMusic/ed089a_cover.jpg', 'uploads/audio/PoPMusic/ed089a_audio.mp3', '2025-07-14 00:00:00.000000', 3, ''),
('f3bcc1', 'Rockot', 'Bad Boy Bounce', 'Rockot', 'Hip-Hop', 113, 'uploads/cover/Hip-Hop/f3bcc1_cover.jpg', 'uploads/audio/Hip-Hop/f3bcc1_audio.mp3', '2025-07-15 00:00:00.000000', 0, ''),
('f4cf42', 'LacoreDiamond', 'Lacore Diamond - Rea', 'LacoreDiamond', 'PoPMusic', 249, 'uploads/cover/PoPMusic/f4cf42_cover.jpg', 'uploads/audio/PoPMusic/f4cf42_audio.mp3', '2025-07-15 00:00:00.000000', 0, ''),
('fb69f8', 'OVERFIEND', 'HARSHDOLL', 'OVERFIEND', 'PoPMusic', 336, 'uploads/cover/PoPMusic/fb69f8_cover.jpg', 'uploads/audio/PoPMusic/fb69f8_audio.mp3', '2025-07-15 00:00:00.000000', 0, '');

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
(2, '24f808f9d613ab53998c543a2d176276cf74', 'c4fc52', '2025-07-17'),
(4, '24f808f9d613ab53998c543a2d176276cf74', '946b71', '2025-07-17'),
(5, '24f808f9d613ab53998c543a2d176276cf74', '104452', '2025-07-17'),
(6, '24f808f9d613ab53998c543a2d176276cf74', '440b77', '2025-07-17'),
(7, '24f808f9d613ab53998c543a2d176276cf74', '06eb6d', '2025-07-17'),
(8, '24f808f9d613ab53998c543a2d176276cf74', 'f4cf42', '2025-07-17'),
(9, '24f808f9d613ab53998c543a2d176276cf74', 'e65e65', '2025-07-17');

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
  `cover_url` varchar(45) NOT NULL COMMENT '歌單封面',
  `created_at` date NOT NULL COMMENT '建立時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `user_playlists`
--

INSERT INTO `user_playlists` (`playlist_id`, `playname`, `user_id`, `playdescription`, `cover_url`, `created_at`) VALUES
('6878da63e9389', '測試', '24f808f9d613ab53998c543a2d176276cf74', '這是測試用', 'uploads/play_cover/6878da63e9389_cover.png', '2025-07-17');

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
  ADD UNIQUE KEY `song_id` (`song_id`),
  ADD KEY `chart_id` (`chart_id`),
  ADD KEY `position` (`position`);

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
  ADD UNIQUE KEY `playlist_id_2` (`playlist_id`),
  ADD KEY `playlist_id` (`playlist_id`,`user_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user_favorites`
--
ALTER TABLE `user_favorites`
  MODIFY `favorites_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '收藏的編碼', AUTO_INCREMENT=10;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `chart_songs`
--
ALTER TABLE `chart_songs`
  ADD CONSTRAINT `chart_songs_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`),
  ADD CONSTRAINT `chart_songs_ibfk_3` FOREIGN KEY (`chart_id`) REFERENCES `charts` (`charts_id`);

--
-- 資料表的限制式 `playlist_songs`
--
ALTER TABLE `playlist_songs`
  ADD CONSTRAINT `playlist_songs_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`),
  ADD CONSTRAINT `playlist_songs_ibfk_3` FOREIGN KEY (`playlist_id`) REFERENCES `user_playlists` (`playlist_id`);

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
