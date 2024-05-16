-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (x86_64)
--
-- Host: localhost    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` mediumtext NOT NULL,
  `fk_postid` int NOT NULL,
  `fk_authorid` int NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `comment_belongsTo_idx` (`fk_postid`),
  KEY `comment_author_idx` (`fk_authorid`),
  CONSTRAINT `comment_author` FOREIGN KEY (`fk_authorid`) REFERENCES `users` (`id`),
  CONSTRAINT `comment_belongsTo` FOREIGN KEY (`fk_postid`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (3,'this is a test comment',4,5,'2022-05-17 23:35:59'),(4,'this is a test comment',4,5,'2022-05-17 23:37:17'),(5,'This is a test from the front end of the llama website',4,9,'2022-05-18 15:52:58'),(6,'This is another test comment from the front end',7,4,'2022-05-18 15:54:25'),(7,'This is a test of full comment fucntionality',7,4,'2022-05-18 17:07:05'),(9,'This is a test of full comment functionality 2',7,4,'2022-05-18 17:27:36'),(14,'Here\'s another comment',7,4,'2022-05-18 17:43:47'),(15,'I am making a test comment.',6,4,'2022-05-18 17:44:09'),(16,'I am making a test comment.',6,4,'2022-05-18 17:44:51'),(17,'I am making a test comment.',6,4,'2022-05-18 17:45:47'),(18,'I am making another test comment.',6,4,'2022-05-18 17:47:06');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` mediumtext NOT NULL,
  `photopath` varchar(2048) NOT NULL,
  `thumbnail` varchar(2048) NOT NULL,
  `created` datetime NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `fk_userid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `post_author_id` (`fk_userid`),
  CONSTRAINT `post_author` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (4,'Sexy Smexy Llama2','Llama Flirty flirty','public/images/uploads/5faa6056de7ab3e1e556584bdf2efbadbf4cd6fd3b8e.png','public/images/uploads/thumbnail-5faa6056de7ab3e1e556584bdf2efbadbf4cd6fd3b8e.png','2022-05-13 18:08:59',1,3),(5,'Smiley Smiley','It\'s an Alpaca to make you happy.','public/images/uploads/855cb4d86f0459cd6e74fb5d4f9f8b641d1d343a1a14.png','public/images/uploads/thumbnail-855cb4d86f0459cd6e74fb5d4f9f8b641d1d343a1a14.png','2022-05-13 18:15:33',1,3),(6,'Llamas are Better','Llamas are better than people tbh. Change my mind','public/images/uploads/961dfc84d372dffb016faa4d60ad07a56a19d90a264e.jpeg','public/images/uploads/thumbnail-961dfc84d372dffb016faa4d60ad07a56a19d90a264e.jpeg','2022-05-15 13:59:59',1,5),(7,'Can\'t Tell','We don\'t know, Can\'t tell...sorry.','public/images/uploads/dbebcac22d95914f6f113e9d7b7ce7b1e17579138f0c.webp','public/images/uploads/thumbnail-dbebcac22d95914f6f113e9d7b7ce7b1e17579138f0c.webp','2022-05-15 14:00:39',1,5),(8,'End of the Llama-world!','It\'s the Llamageddon','public/images/uploads/132d80c87e0776208de4b028e5df429ab2313f978110.jpeg','public/images/uploads/thumbnail-132d80c87e0776208de4b028e5df429ab2313f978110.jpeg','2022-05-16 18:54:21',1,4);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(128) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Test3','Test3@test.test','$2b$15$JIAPYN6sAx5GqE4x.xh1UODQwMrAfNi42H88FidApCItInFTxOfMa',1,'2022-05-08 12:38:24'),(4,'Test5','Test5@test.test','$2b$15$wi2IT8oZSgvF1b/VR8BUg.R.gGot1d5cdLZCN/R4v1rvFYuBt33mq',1,'2022-05-09 16:56:20'),(5,'Test6','Test6@test.test','$2b$15$9VCnM2hGSZc7luYqVnjrkOyNKjOdWRHJJVcYxGuQ8BXZbNDoS5AAa',1,'2022-05-09 16:57:34'),(6,'Test1','Test1@test.test','$2b$15$.h.3/tW8CLnhFYbAoiVwdOHFXDETcNwGuU2eSL83BOUoveSMcGNBm',1,'2022-05-09 20:08:43'),(7,'Test2','Test2@test.test','$2b$15$NK9iY1SeoAPBV.p2SRFxS.FM2RusYTr1O9LYPkP7WMBWHNxHpcrEy',1,'2022-05-09 20:20:20'),(9,'Test7','Test7@test.test','$2b$15$3GPBVZx0wZLOodG4z8rQseKO8Yqq4rk7zqfk936oiByb3RPybdP6W',1,'2022-05-16 16:53:24');
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

-- Dump completed on 2022-05-18 18:26:37
