CREATE DATABASE  IF NOT EXISTS `sp_movie` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sp_movie`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `movie_id` int NOT NULL,
  `comment` varchar(255) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `fk_userid_idx` (`user_id`),
  KEY `fk_movieid_idx` (`movie_id`),
  CONSTRAINT `fk_movieid` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movieid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_userid` FOREIGN KEY (`user_id`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,3,'Oi','2022-08-16 06:00:42'),(2,2,3,'I think the movie is good.','2022-08-16 07:17:05'),(18,54,16,'Bumble bee is so Handsome!','2022-08-16 08:43:00'),(21,54,16,'Exciting day approaches.','2022-08-19 01:39:25'),(23,84,16,'Glad you like the movie!','2022-08-23 14:12:48'),(24,84,152,'Great!','2022-08-29 11:45:17'),(25,54,2,'Hello~','2022-08-30 14:45:28'),(26,54,1,'Hello?','2022-08-31 13:23:02'),(27,54,159,'password','2022-09-01 12:19:54');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourites`
--

DROP TABLE IF EXISTS `favourites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favourites` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `movie_id` int NOT NULL,
  `isFavourite` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`like_id`),
  KEY `fk_movieid3_idx` (`movie_id`),
  KEY `fk_userid3_idx` (`user_id`),
  CONSTRAINT `fk_movieid3` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movieid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_userid3` FOREIGN KEY (`user_id`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourites`
--

LOCK TABLES `favourites` WRITE;
/*!40000 ALTER TABLE `favourites` DISABLE KEYS */;
INSERT INTO `favourites` VALUES (5,54,3,1),(13,54,11,1),(17,54,22,1),(18,54,40,1),(21,54,16,1),(23,84,1,1),(26,54,2,1),(27,54,1,1),(29,84,152,1),(30,84,188,1),(31,84,189,1);
/*!40000 ALTER TABLE `favourites` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Comedy','A genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter, especially in theatre, film, stand-up comedy, television, radio, books, or any other entertainment medium.'),(2,'Action','The action genre has close ties to classic strife and struggle narratives that you find across all manner of art and literature'),(4,'Romance','Love stories and the journey that love takes through courtship or marriage.'),(5,'SciFi','A genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, alien worlds, extrasensory perception and time travel'),(6,'Fantasy','A genre that features the use of magic or other supernatural phenomena in the plot, setting, or theme.'),(7,'Drama','A category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'),(8,'Thriller','A dark, engrossing, and suspenseful plot-driven stories. ...'),(9,'Horror','A literature, film, and television that is meant to scare, startle, shock, and even repulse audiences.'),(10,'Western','Set primarily in the latter half of the 19th and early 20th century in the Western United States, which is styled the \"Old West\".'),(11,'Rom Com','Romance comedy'),(18,'Eastern','Adventure in the east'),(20,'Adventure','A genre of film whose plots feature elements of travel.'),(21,'Family','Good to watch with your family.'),(64,'Mystery','A genre of fiction that follows a crime (like a murder or a disappearance) from the moment it is committed to the moment it is solved.'),(120,'Slapstick','A comedy based on deliberately clumsy actions and humorously embarrassing events.'),(123,'AA31','AA31'),(124,'TestXTestX','TestXTestXTestX');
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
  `thumbnail` varchar(255) DEFAULT 'noImage.png',
  PRIMARY KEY (`movieid`),
  UNIQUE KEY `title_UNIQUE` (`title`),
  KEY `fk_genreid_idx` (`genreid`),
  KEY `genreid1_idx` (`genreid1`),
  CONSTRAINT `genreid` FOREIGN KEY (`genreid`) REFERENCES `genre` (`genreID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `genreid1` FOREIGN KEY (`genreid1`) REFERENCES `genre` (`genreID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=191 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (1,'Avengers: Infinity War','The Avengers must stop Thanos, an intergalactic warlord, from getting his hands on all the infinity stones. However, Thanos is prepared to go to any lengths to carry out his insane plan.','Anthony Russo, Joe Russo',10,6,'2h 29m','26 April 2018','avengersInfinityWar.png'),(2,'Godzilla vs. Kong','Legends collide as Godzilla and Kong, the two most powerful forces of nature, clash on the big screen in a spectacular battle for the ages. As a squadron embarks on a perilous mission into fantastic uncharted terrain, unearthing clues to the Titans\' very origins and mankind\'s survival, a conspiracy threatens to wipe the creatures, both good and bad, from the face of the earth forever','Shun Oguri, Rebecca Hall',7,8,'1h 53m','24 Mar 2021','godzillaVSkong.png'),(3,'Call','Connected by phone in the same home but 20 years apart, a serial killer puts another woman\'s past -- and life -- on the line to change her own fate.','Park Shin-hye, Jeon Jong-seo',8,9,'1h 52m','27 Nov 2020','call.png'),(11,'Transformers: Age of Extinction','The Autobots, a faction of robots from the planet Cybertron, are hunted down by an elite CIA black ops unit and a ruthless bounty hunter. They turn to a struggling inventor and his daughter for help.','Michael Bay',5,6,'2h 45m','26 June 2014','transformersAgeOfExtinction.png'),(12,'Transformers: The Last Knight','Quintessa brainwashes Optimus Prime and heads to Earth to search for an ancient staff. Cade, Bumblebee and the Autobots race against time to find it, while also escaping an anti-Transformers force.','Michael Bay',2,8,'2h 34m',' 22 June 2017','transformersLastKnight.png'),(16,'Bumblebee','During the Cybertron Civil War, Optimus Prime sends Autobot scout B-127 to Earth to form a base where they can regroup. Later, the scout befriends a girl named Charlie, who names him Bumblebee.','Travis Knight',5,20,'1h 54m',' 20 December 2018','bumblebee.png'),(17,'Black Panther','After his father\'s death, T\'Challa returns home to Wakanda to inherit his throne. However, a powerful enemy related to his family threatens to attack his nation.','Ryan Coogler',20,2,' 2h 15m','14 February 2018','blackpanther.png'),(20,'Captain America: Civil War','Friction arises between the Avengers when one group supports the government\'s decision to implement a law to control their powers while the other opposes it.','Joe Russo, Anthony Russo',20,2,'2h 28m','21 April 2016','captAmericaCivilWar.png'),(22,'Annabelle','John and Mia Form are attacked by members of a satanic cult that uses their old doll as a conduit to make their life miserable. This unleashes a string of paranormal events in the Forms\' residence.','John R. Leonetti',9,8,'1h 35m','2 October 2014','annabelle.png'),(26,'The Fate of the Furious','Dom encounters a mysterious woman, Cipher, who gets him involved in the world of terrorism. The crew has to reunite to stop Cipher and save the man who brought them together as a family.','F. Gary Gray',2,18,'2h 16m','13 April 2017','fateofthefurious.png'),(40,'The Divergent Series: Insurgent','Tris Prior is a divergent who does not belong to any one faction dictated by the government. She must unite with other divergents and unravel a conspiracy that threatens their lives.','Robert Schwentke',5,2,'1h 59m','19 March 2015','insurgent.png'),(152,'Spiderman 3','Peter Parker becomes one with a symbiotic alien that bolsters his Spider-Man avatar and affects his psyche. He also has to deal with Sandman and maintain a fragmented relationship with Mary Jane.','Tom Holland',2,5,'2h 19m','1 May 2007','spiderman3.png'),(157,'Cars 2','Star racecar Lightning McQueen and his friend Mater journey abroad to participate in a Grand Prix race. The path to the championship becomes troublesome when Mater gets involved in espionage.','John Lasseter',1,21,'1h 46m','25 August 2011','cars2.png'),(158,'F9','Dominic Toretto is forced to put his retirement on hold when Cipher, the dangerous cyberterrorist, escapes with the help of Dominic\'s estranged brother, an international terrorist.','Justin Lin',2,20,'2h 23m','25 June 2021','f9.png'),(159,'Mr Bean Movie','Mr Bean, a lazy security guard, is sent to the United States to bring a valued painting to a museum in Los Angeles. However, a comical adventure ensues when a curator mistakes him for an art expert.','Rowan Atkinson',1,120,'1h 25m','30 August 1997','mrbean.png'),(160,'Inside Out','Eleven-year-old Riley moves to San Francisco, leaving behind her life in Minnesota. She and her five core emotions, Fear, Anger, Joy, Disgust and Sadness, struggle to cope with her new life.','Pete Docter',21,1,'1h 35m','19 June 2015','insideout.png'),(185,'The Contractor','The Contractor is a 2022 American action thriller film directed by Tarik Saleh in his English-language film debut. The film stars Chris Pine, Ben Foster, Gillian Jacobs, Eddie Marsan, J. D. Pardo, Florian Munteanu, and Kiefer Sutherland.','Tarik Saleh',2,8,'1h 43m','22 March 2022','thecontractor.png'),(187,'Fullmetal Alchemist the Revenge of Scar','The Elric brothers meet their toughest opponent yet -- a lone serial killer with a large scar on his forehead. As they attempt to catch him, they learn a series of dark secrets about some of their fellow alchemists.','Fumihiko Sori',2,6,'2h 5m','20 May 2022','fullmetal.png'),(188,'Prey','Prey is a 2022 American science fiction action horror film based on the Predator franchise. It is the fifth installment and is a prequel to the first four films, being set in the Northern Great Plains in North America in 1719. The film is directed by Dan Trachtenberg and written by Patrick Aison.','Dan Trachtenberg',9,5,'1h 39m','21 July 2022','prey.png'),(189,'Beach','Beach','Beach',6,21,'1h','20 February 2007','beach.jpg'),(190,'TESTs','TESTs','TESTs',64,123,'TESTs','TESTs','noImage.png');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` decimal(5,2) NOT NULL,
  `review` varchar(255) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `fk_movieid_idx` (`movie_id`),
  KEY `fk_userid_idx` (`user_id`),
  CONSTRAINT `fk_movieid2` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movieid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_userid2` FOREIGN KEY (`user_id`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (6,16,1,5.00,'Favourite','2022-08-16 12:10:20'),(7,2,1,5.00,'Stunning Graphics! Must watch!','2022-08-16 12:12:09'),(8,16,54,4.00,'Would give a rating of 5 if the movie was longer...','2022-08-16 12:12:58'),(10,12,54,4.00,'Eggcellent Movie!','2022-08-16 12:28:54'),(11,1,54,5.00,'Long awaited amazing!','2022-08-18 07:51:14'),(12,2,54,5.00,'Wonders.','2022-08-18 09:02:37'),(17,16,84,5.00,'Admin here!','2022-08-23 14:12:35'),(18,152,84,5.00,'Great show!','2022-08-29 11:45:57'),(19,160,84,0.00,'Yuck!','2022-08-29 11:46:57'),(20,3,54,4.00,'Great','2022-08-30 14:22:20'),(27,2,84,3.10,'I love this!','2022-09-03 09:12:00'),(28,11,84,4.20,'Childhood favourite!','2022-09-03 09:14:55'),(29,189,84,4.41,'Delete','2022-09-03 09:17:06');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
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
  `role` char(10) NOT NULL DEFAULT 'Customer',
  `pic` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Terry Tan','terry@gmail.com','91234567','Admin','boy.png','2021-06-01 03:01:40','password'),(2,'Garry Koh','garry1235@yahoo.com','81234988','Admin','dog.png','2021-06-01 03:14:23','password'),(5,'Vincent Wong','vwabc@gmail.com','78906456','Customer','dog.png','2021-07-03 08:50:44','password'),(6,'Timothy Lee','timothylee@bmail.com','94559455','Customer','dog.png','2021-07-03 13:51:20','password'),(7,'John Tan','john@gmail.com','91112223','Admin','dog.png','2021-07-08 00:09:12','password'),(9,'Jerald Chua','jerald201@gmail.com','91112225','Customer','dog.png','2021-07-14 01:58:39','password'),(11,'Jacob Bread','jacob@email.com','81234545','Admin','boy.png','2021-07-14 15:34:34','password'),(18,'Robert Tan','roberttan@gmail.com','91304040','Admin','boy.png','2021-07-14 15:54:12','password'),(35,'Michael Koh','michaelkoh@email.com','91234564','Customer','boy.png','2022-06-04 04:10:18','password'),(36,'covidtom','covidtom@email.com','12345678','Customer','boy.png','2022-08-15 07:30:36','password'),(38,'covidtom2','covidtom2@email.com','12345678','Customer','boy.png','2022-08-15 07:31:17','password'),(40,'molten','molten@email.com','1234','Customer','boy.png','2022-08-15 07:43:55','password'),(42,'jacky4','jacky4@email.com','1234','Customer','boy.png','2022-08-15 07:46:29','password'),(43,'jacky5','jacky5@email.com','1234','Customer','cat.png','2022-08-15 07:47:42','password'),(46,'covidtom3','covidtom3@email.com','12345678','Customer','cat.png','2022-08-15 07:51:13','password'),(48,'fefes','ffef','2321','Customer','cat.png','2022-08-15 07:52:16','password'),(49,'covidtom4','covidtom4@email.com','12345678','Customer','cat.png','2022-08-15 07:53:30','password'),(54,'Mary','mary@email.com','86681235','Customer','girl.png','2022-08-15 07:57:36','password'),(56,'mary2','mary2@designer.com','1234','Customer','cat.png','2022-08-15 07:59:45','password'),(58,'mary3','mary3@email.com','1234','Customer','cat.png','2022-08-15 08:03:35','password'),(62,'covidtom6','covidtom6@email.com','12345678','Customer','boy.png','2022-08-15 08:04:19','password'),(84,'admin','admin@email.com','81239876','Admin','cat.png','2022-08-23 13:18:10','password');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'sp_movie'
--

--
-- Dumping routines for database 'sp_movie'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-03 17:36:15
