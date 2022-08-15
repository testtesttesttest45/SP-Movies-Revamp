CREATE DATABASE  IF NOT EXISTS `sp_movie` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sp_movie`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: sp_movie
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `genreID` int NOT NULL AUTO_INCREMENT,
  `genre` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`genreID`),
  UNIQUE KEY `genre_UNIQUE` (`genre`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Comedy','designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.'),(2,'Action','the action genre has close ties to classic strife and struggle narratives that you find across all manner of art and literature'),(4,'Romance','love stories and the journey that love takes through courtship or marriage.'),(5,'SciFi','a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, alien worlds, extrasensory perception and time travel'),(6,'Fantasy',' features the use of magic or other supernatural phenomena in the plot, setting, or theme.'),(7,'Drama',' a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'),(8,'Thriller',' dark, engrossing, and suspenseful plot-driven stories. ...'),(9,'Horror',' literature, film, and television that is meant to scare, startle, shock, and even repulse audiences.'),(10,'Western','set primarily in the latter half of the 19th and early 20th century in the Western United States, which is styled the \"Old West\".'),(11,'Rom Com','Romance comedy'),(18,'Eastern','Adventure in the east'),(20,'Adventure','A genre of film whose plots feature elements of travel.'),(21,'ABC','abc'),(23,'tom','tom '),(25,'',''),(26,'t','aa'),(27,'testing','new'),(28,'aa','ad'),(31,'aaaaa22','aaccc'),(32,'1','2'),(34,'111','2'),(35,'121','11'),(36,'er','ee'),(37,'fr','ee'),(38,'Test','For testing only.!'),(39,'testtt','123'),(41,'144','22'),(42,'test 56','45'),(43,'qq',''),(44,'22',''),(46,'22f','22'),(47,'fffffffffff','ffffffffffff'),(48,'work','please'),(49,'cant','work'),(50,'ddd','ddd'),(51,'sddd','sds');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `movieid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(500) NOT NULL,
  `cast` varchar(500) NOT NULL,
  `genreid` int NOT NULL,
  `genreid1` int NOT NULL,
  `time` varchar(45) NOT NULL,
  `opening_date` varchar(45) NOT NULL,
  PRIMARY KEY (`movieid`),
  UNIQUE KEY `title_UNIQUE` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (1,'Avengers: Infinity War','The Avengers must stop Thanos, an intergalactic warlord, from getting his hands on all the infinity stones. However, Thanos is prepared to go to any lengths to carry out his insane plan.    ','Robert Downey Jr., Chris Hemsworth, Mark Ruffalo, Chris Evans, Scarlett Johansson, BenedicCumberbatch, Don Cheadle, Tom Holland, Chadwick Boseman, Paul Bettany, Elizabeth Olsen, Anthony Mackie, Sebastian Stan',2,5,'160 min','26 Apr 2018'),(2,'Godzilla vs. Kong','Legends collide as Godzilla and Kong, the two most powerful forces of nature, clash on the big screen in a spectacular battle for the ages. As a squadron embarks on a perilous mission into fantastic uncharted terrain, unearthing clues to the Titans\' very origins and mankind\'s survival, a conspiracy threatens to wipe the creatures, both good and bad, from the face of the earth forever','Shun Oguri, Rebecca Hall, Kyle Chandler, Millie Bobby Brown, Brian Tyree Henry, Alexander Skarsgard , Eiza González, Julian Dennison, Demián Bichir',2,5,'113 min','24 Mar 2021'),(3,'Call','Connected by phone in the same home but 20 years apart, a serial killer puts another woman\'s past -- and life -- on the line to change her own fate.','Park Shin-hye, Jeon Jong-seo, Kim Sung-ryung, Lee El, Oh Jung-se, Lee Dong-hwi, Park Ho-san',6,8,'112 min','27 Nov 2020'),(8,'Mr Bean Movie','Watch an hour long of Mr Bean uninterrupted!','Rowan Atkinson',1,11,'60 min','2 Jan 2019'),(11,'ABC','abc','abc',2,20,'131 min','17 May 2013'),(12,'Oil Spilled treatment by Oil eating mushrooms','aaaa','aaaa',1,2,'12','24 mar '),(16,'Oil ','aaaa','aaaa',1,2,'12','24 mar '),(17,'Mr.','abc','123',1,2,'120 min','20 april 2024'),(18,'RE: Week 6 - Prototype Draft','11','233',44,223,'11','12 br'),(20,'Air Pollution in Pakistan Group 5s','sds','sdas',1,2,'220 mins','FINALLY'),(21,'Mr.s','sds','sds',1,2,'112','24 March 2021'),(22,'Mr.g','aa','ff',1,3,'aa','24 March 2021');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie0`
--

DROP TABLE IF EXISTS `movie0`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie0` (
  `movieid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(500) NOT NULL,
  `cast` varchar(500) NOT NULL,
  `genreid` varchar(45) NOT NULL,
  `genreid0` varchar(45) NOT NULL,
  `time` varchar(45) NOT NULL,
  `opening_date` varchar(45) NOT NULL,
  PRIMARY KEY (`movieid`),
  UNIQUE KEY `title_UNIQUE` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie0`
--

LOCK TABLES `movie0` WRITE;
/*!40000 ALTER TABLE `movie0` DISABLE KEYS */;
INSERT INTO `movie0` VALUES (1,'Avengers: Infinity War','The Avengers must stop Thanos, an intergalactic warlord, from getting his hands on all the infinity stones. However, Thanos is prepared to go to any lengths to carry out his insane plan.    ','Robert Downey Jr., Chris Hemsworth, Mark Ruffalo, Chris Evans, Scarlett Johansson, BenedicCumberbatch, Don Cheadle, Tom Holland, Chadwick Boseman, Paul Bettany, Elizabeth Olsen, Anthony Mackie, Sebastian Stan','2','5','160 min','26 April 2018'),(2,'Godzilla vs. Kong','Legends collide as Godzilla and Kong, the two most powerful forces of nature, clash on the big screen in a spectacular battle for the ages. As a squadron embarks on a perilous mission into fantastic uncharted terrain, unearthing clues to the Titans\' very origins and mankind\'s survival, a conspiracy threatens to wipe the creatures, both good and bad, from the face of the earth forever','Shun Oguri, Rebecca Hall, Kyle Chandler, Millie Bobby Brown, Brian Tyree Henry, Alexander Skarsgard , Eiza González, Julian Dennison, Demián Bichir','2','5','113 min','24 Mar 2021'),(3,'Call','Connected by phone in the same home but 20 years apart, a serial killer puts another woman\'s past -- and life -- on the line to change her own fate.','Park Shin-hye, Jeon Jong-seo, Kim Sung-ryung, Lee El, Oh Jung-se, Lee Dong-hwi, Park Ho-san','6','8','112 min','27 Nov 2020');
/*!40000 ALTER TABLE `movie0` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `reviewid` int NOT NULL AUTO_INCREMENT,
  `movieid` int NOT NULL,
  `userid` int NOT NULL,
  `rating` int NOT NULL,
  `review` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reviewid`),
  UNIQUE KEY `reviewid_UNIQUE` (`reviewid`),
  KEY `userid_idx` (`userid`),
  KEY `movieid_idx` (`movieid`),
  CONSTRAINT `movieid` FOREIGN KEY (`movieid`) REFERENCES `movie` (`movieid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,1,1,4,'Defintely enjoyed more than I thought, all should give it a try','2021-07-03 07:30:48'),(4,2,1,5,'Best movie I had ever seen!','2021-07-03 07:33:51'),(5,2,5,3,'Spectacular scenes!','2021-07-03 07:34:28'),(6,3,2,5,'Unbelievable twist of plots!','2021-07-03 07:35:03'),(7,2,2,4,'Love the characters!','2021-07-03 12:08:46'),(8,3,6,5,'Marvelous climax!','2021-07-03 13:51:53'),(9,1,2,5,'Love the actions!','2021-07-03 14:46:42'),(10,3,6,2,'The movie was very exciting but too scary for me to watch','2021-07-04 02:05:41'),(11,3,9,5,'Great movie!','2021-07-14 13:11:36'),(12,1,1,4,'Great show!','2021-08-17 02:41:27'),(13,3,5,4,'Great show!','2021-08-17 02:42:55'),(14,8,11,5,'Eggcellent ','2021-08-17 02:50:29'),(15,1,1,2,'It.s ok.','2021-08-17 05:01:42'),(16,1,2,1,'BAD','2021-08-17 07:36:30'),(25,1,2,2,'2','2021-08-17 07:56:54'),(26,1,2,2,'2','2021-08-17 07:57:26'),(31,1,1,1,'1','2021-08-17 11:14:59'),(32,1,2,3,'It.s ok.','2021-08-17 11:17:32'),(33,1,2,3,'It.s ok.','2021-08-17 11:21:33'),(34,1,2,3,'4','2021-08-17 11:21:38'),(35,1,2,3,'gg','2021-08-17 11:21:58'),(36,1,2,3,'gdfd','2021-08-17 11:22:50'),(37,1,2,3,'gdfd','2021-08-17 11:22:56'),(46,2,2,3,'good','2021-08-17 11:30:34'),(48,2,1,3,'good','2021-08-17 11:31:06'),(50,1,1,2,'FIANNLY','2021-08-17 11:33:03');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact` varchar(45) NOT NULL,
  `role` char(10) NOT NULL,
  `pic` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Terry Tan','terry@gmail.com','91234567','Customer','terry.jpg','2021-06-01 03:01:40','abc123'),(2,'Garry Koh','garry1235@yahoo.com','81234988','Admin','garry.jpg','2021-06-01 03:14:23','garrykoh0'),(5,'Vincent Wong','vwabc@gmail.com','78906456','Customer','vincent.jpg','2021-07-03 08:50:44','vwabc123'),(6,'Timothy Lee','timothylee@bmail.com','94559455','Customer','timothy.jpg','2021-07-03 13:51:20','timothygood'),(7,'John Tan','john@gmail.com','91112223','Customer','john.jpg','2021-07-08 00:09:12','password'),(9,'Jerald Chua','jerald201@gmail.com','91112225','Customer','chua.jpg','2021-07-14 01:58:39','jerlad'),(11,'Jacob Bread','jacobbread@gmail.com','91112333','Admin','jacob.jpg','2021-07-14 15:34:34','imlovebread'),(18,'Robert Tan','roberttan@gmail.com','91304040','Admin','robbery.jpg','2021-07-14 15:54:12','robberyRobert');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-19 18:48:04
