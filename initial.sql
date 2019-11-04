-- CS 340 Databases
-- Authors: Mike Cumberworth, Sriram Narayanan
-- "Tsundoku" Final Project 
-- Initial Database Setup and Seed Data
-- Fall 2019


-- Variable delimeter used throughout: '$$'

-- DELIMITER $$
 
-- CREATE PROCEDURE `nukeDB`()
-- BEGIN
--     SET FOREIGN_KEY_CHECKS = 0;
--     DROP TABLE IF EXISTS users;
--     DROP TABLE IF EXISTS media_items;
--     DROP TABLE IF EXISTS media_queues;
--     DROP TABLE IF EXISTS queue_items;
--     DROP TABLE IF EXISTS genres;
--     DROP TABLE IF EXISTS item_genres;
--     DROP TABLE IF EXISTS hashed_credentials;
-- END$$
 
-- DELIMITER ;

SET FOREIGN_KEY_CHECKS = 0;
--
-- Table structure for table user
--

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id int unsigned NOT NULL AUTO_INCREMENT,
  username varchar(100) NOT NULL ,
  user_email varchar(100) NOT NULL,
  PRIMARY KEY (user_id),
  KEY idx_user_email (user_email),
  CONSTRAINT unique_username UNIQUE(username),
  CONSTRAINT unique_email UNIQUE(user_email)
);

--
-- Seed data for table user
--

LOCK TABLES users WRITE;

INSERT INTO users VALUES (1,'MikeC','mc@fakeemail.com'),
(2,'Sri','sri@fakeemail.com'),
(3,'Guest User','guest@fakeemail.com');

UNLOCK TABLES;

--
-- Table structure for table address
--

DROP TABLE IF EXISTS media_items;

CREATE TABLE media_items (
  media_item_id int unsigned NOT NULL AUTO_INCREMENT,
  media_type enum('Book','Movie','Audio Album','Periodical','Short') DEFAULT 'Book' NOT NULL,
  title varchar(255) NOT NULL,
  original_language_title varchar(255) DEFAULT NULL,
  publication_year year(4) DEFAULT NULL,
  avg_user_rating float(2) DEFAULT NULL,
  -- SKU, ISBN, Editions, etc...?
  PRIMARY KEY (media_item_id),
  KEY idx_title (title),
  KEY idx_original_language_title (original_language_title)
);

--
-- Seed data for table media_items
--

LOCK TABLES media_items WRITE;

INSERT INTO media_items VALUES 
(1, 'Book', 'A Common Sense Guide to Data Structures and Algorithms', NULL , 2017, NULL), 
(2, 'Book', 'Cracking the Coding Interview, 6th Ed', NULL, 2015, NULL), 
(3, 'Book', 'Taiwan Today', '今日台灣', 2004, NULL), 
(4, 'Book', 'Modern Chinese Conversation, Revised Edition', '新編會話', 1998, NULL); 
UNLOCK TABLES;

--
-- Table structure for media_queues
--

DROP TABLE IF EXISTS media_queues;

CREATE TABLE  media_queues (
  media_queue_id int unsigned NOT NULL AUTO_INCREMENT,
  user_id int unsigned NOT NULL, 
  PRIMARY KEY (media_queue_id),
  CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users (user_id) ON UPDATE CASCADE
);

--
-- Seed data for table media_queues
--

LOCK TABLES media_queues WRITE;
-- NONE, for now. We might want to create a few fake/pre-made queues, or figure out how to export one once we've added stuff
UNLOCK TABLES;

--
-- Table structure for table queue_items
--

DROP TABLE IF EXISTS queue_items;

CREATE TABLE queue_items (
  media_queue_id int unsigned NOT NULL,
  media_item_id int unsigned NOT NULL,
  CONSTRAINT media_item_fk FOREIGN KEY (media_item_id) REFERENCES media_items(media_item_id),
  CONSTRAINT queue_fk FOREIGN KEY (media_queue_id) REFERENCES media_queues(media_queue_id)
);

--
-- Table structure for table genres
--

DROP TABLE IF EXISTS genres;

CREATE TABLE genres (
  genre_id int unsigned NOT NULL AUTO_INCREMENT,
  genre_name varchar(25) NOT NULL,
  PRIMARY KEY (genre_id)
);

--
-- Seed data for table genres
--

LOCK TABLES genres WRITE;
INSERT INTO genres VALUES 
(1,'Action'),
(2,'Animation'),
(3,'Children'),
(4,'Classics'),
(5,'Comedy'),
(6,'Documentary'),
(7,'Drama'),
(8,'Family'),
(9,'Foreign'),
(10,'Games'),
(11,'Horror'),
(12,'Music'),
(13,'New'),
(14,'Sci-Fi'),
(15,'Sports'),
(16,'Travel');
UNLOCK TABLES;


--
-- Table structure for table item_genres
--

DROP TABLE IF EXISTS item_genres;

CREATE TABLE item_genres (
  genre_id int unsigned NOT NULL,
  media_item_id int unsigned NOT NULL,
  CONSTRAINT item_fk FOREIGN KEY (media_item_id) REFERENCES media_items(media_item_id),
  CONSTRAINT genre_fk FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
);

SET FOREIGN_KEY_CHECKS = 1;

--
-- Table structure for table language
--

-- DROP TABLE IF EXISTS language;
-- CREATE TABLE language (
--   language_id tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
--   name char(20) NOT NULL,
--   last_update timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   PRIMARY KEY (language_id)
-- );

-- --
-- -- Dumping data for table language
-- --

-- LOCK TABLES language WRITE;
-- /*!40000 ALTER TABLE language DISABLE KEYS */;
-- INSERT INTO language VALUES (1,'English','2006-02-15 13:02:19'),(2,'Italian','2006-02-15 13:02:19'),(3,'Japanese','2006-02-15 13:02:19'),(4,'Mandarin','2006-02-15 13:02:19'),(5,'French','2006-02-15 13:02:19'),(6,'German','2006-02-15 13:02:19');
-- /*!40000 ALTER TABLE language ENABLE KEYS */;
-- UNLOCK TABLES;





