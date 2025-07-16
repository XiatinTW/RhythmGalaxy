-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: music
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chart_songs`
--

DROP TABLE IF EXISTS `chart_songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chart_songs` (
  `chart_id` int(11) NOT NULL COMMENT '排行榜ID',
  `song_id` varchar(36) NOT NULL COMMENT '歌曲ID',
  `position` int(11) NOT NULL COMMENT '名次',
  PRIMARY KEY (`chart_id`),
  UNIQUE KEY `chart_id` (`chart_id`,`song_id`),
  KEY `song_id` (`song_id`),
  CONSTRAINT `chart_songs_ibfk_1` FOREIGN KEY (`chart_id`) REFERENCES `charts` (`charts_id`),
  CONSTRAINT `chart_songs_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chart_songs`
--

LOCK TABLES `chart_songs` WRITE;
/*!40000 ALTER TABLE `chart_songs` DISABLE KEYS */;
/*!40000 ALTER TABLE `chart_songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `charts`
--

DROP TABLE IF EXISTS `charts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `charts` (
  `charts_id` int(11) NOT NULL COMMENT '排行榜ID',
  `chart_name` varchar(100) NOT NULL COMMENT '排行榜名稱',
  `chart_type` varchar(50) NOT NULL COMMENT '排行類型',
  PRIMARY KEY (`charts_id`),
  UNIQUE KEY `charts_id` (`charts_id`),
  KEY `chart_name` (`chart_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `charts`
--

LOCK TABLES `charts` WRITE;
/*!40000 ALTER TABLE `charts` DISABLE KEYS */;
/*!40000 ALTER TABLE `charts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `play_history`
--

DROP TABLE IF EXISTS `play_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `play_history` (
  `history_id` int(11) NOT NULL COMMENT '播放紀錄ID',
  `user_id` varchar(36) NOT NULL COMMENT '使用者ID',
  `song_id` varchar(36) NOT NULL COMMENT '歌曲ID',
  `played_at` date NOT NULL COMMENT '播放時間',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `history_id` (`history_id`,`user_id`,`song_id`),
  KEY `song_id` (`song_id`),
  CONSTRAINT `play_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `play_history_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `play_history`
--

LOCK TABLES `play_history` WRITE;
/*!40000 ALTER TABLE `play_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `play_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist_songs`
--

DROP TABLE IF EXISTS `playlist_songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playlist_songs` (
  `playlist_id` varchar(36) NOT NULL COMMENT '歌單ID',
  `song_id` varchar(36) NOT NULL COMMENT '歌曲ID',
  UNIQUE KEY `playlist_id` (`playlist_id`,`song_id`),
  KEY `song_id` (`song_id`),
  CONSTRAINT `playlist_songs_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist_songs`
--

LOCK TABLES `playlist_songs` WRITE;
/*!40000 ALTER TABLE `playlist_songs` DISABLE KEYS */;
/*!40000 ALTER TABLE `playlist_songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `lyrics_url` varchar(100) NOT NULL COMMENT '歌詞',
  PRIMARY KEY (`song_id`),
  UNIQUE KEY `song_id` (`song_id`),
  KEY `title` (`title`,`artist`,`album`,`genre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES ('1e439e','Kevin Lee','Echoes of You','Kevin Lee','R&B',116,'uploads/cover/R&B/1e439e_cover.jpg','uploads/audio/R&B/1e439e_audio.mp3','2025-07-14 00:00:00.000000',0,''),('c2876f','Ella Moon','Starlight Journey','Ella Moon','PoPMusic',92,'uploads/cover/PoPMusic/c2876f_cover.jpg','uploads/audio/PoPMusic/c2876f_audio.mp3','2025-07-14 00:00:00.000000',0,''),('c4fc52','Luna Black','Shadow Dance','Luna Black','Dance',128,'uploads/cover/Dance/c4fc52_cover.jpg','uploads/audio/Dance/c4fc52_audio.mp3','2025-07-14 00:00:00.000000',0,''),('eac9b5','Alex_MakeMusic','Gorila','MakeMusic','PoPMusic',115,'uploads/cover/PoPMusic/eac9b5_cover.jpg','uploads/audio/PoPMusic/eac9b5_audio.mp3','2025-07-14 00:00:00.000000',0,''),('ed089a','Emma Stone','Lost in the Sky','Emma Stone','PoPMusic',152,'uploads/cover/PoPMusic/ed089a_cover.jpg','uploads/audio/PoPMusic/ed089a_audio.mp3','2025-07-14 00:00:00.000000',3,'');
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_favorites`
--

DROP TABLE IF EXISTS `user_favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_favorites` (
  `favorites_id` int(11) NOT NULL COMMENT '收藏的編碼',
  `user_id` varchar(36) NOT NULL COMMENT '使用者ID',
  `song_id` varchar(36) NOT NULL COMMENT '歌曲ID',
  `created_at` date NOT NULL COMMENT '收藏時間',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `favorites_id` (`favorites_id`,`user_id`,`song_id`),
  KEY `song_id` (`song_id`),
  CONSTRAINT `user_favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_favorites_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_favorites`
--

LOCK TABLES `user_favorites` WRITE;
/*!40000 ALTER TABLE `user_favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_playlists`
--

DROP TABLE IF EXISTS `user_playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_playlists` (
  `playlist_id` varchar(36) NOT NULL COMMENT '歌單ID',
  `playname` varchar(15) NOT NULL COMMENT '歌單名稱',
  `user_id` varchar(36) NOT NULL COMMENT '使用者',
  `playdescription` text NOT NULL COMMENT '簡介',
  `cover_url` varchar(30) NOT NULL COMMENT '歌單封面',
  `created_at` date NOT NULL COMMENT '建立時間',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `playlist_id` (`playlist_id`,`user_id`),
  KEY `PlayID` (`playlist_id`),
  CONSTRAINT `user_playlists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_playlists_ibfk_2` FOREIGN KEY (`playlist_id`) REFERENCES `playlist_songs` (`playlist_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_playlists`
--

LOCK TABLES `user_playlists` WRITE;
/*!40000 ALTER TABLE `user_playlists` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_playlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` varchar(36) NOT NULL COMMENT '使用者ID',
  `username` varchar(24) NOT NULL COMMENT '帳號',
  `email` varchar(100) NOT NULL COMMENT '電子信箱',
  `password` varchar(255) NOT NULL COMMENT '密碼',
  `created_at` date NOT NULL COMMENT '註冊時間',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id` (`user_id`,`username`,`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('24f808f9d613ab53998c543a2d176276cf74','測試員','123@gmail.com','1234','2025-07-16');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-16 22:28:08
