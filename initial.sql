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
  username varchar(100) NOT NULL,
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
  media_type enum('Book','Movie','Audio Album','Periodical','Short') DEFAULT 'Movie' NOT NULL,
  title varchar(255) NOT NULL,
  original_language_title varchar(255) DEFAULT NULL,
  publication_year int(4) DEFAULT NULL,
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
(4, 'Book', 'Modern Chinese Conversation, Revised Edition', '新編會話', 1998, NULL), 
(5, 'Book', 'The Hobbit', 'There, and Back Again', 1937, NULL), 
(6, 'Movie', 'The Hobbit', NULL, 1977, 3.4), 
(7, 'Audio Album', 'Tool - Fear Inoculum', NULL, 2019, 3.7); 
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
INSERT INTO media_queues (user_id) VALUES (1), (2);
UNLOCK TABLES;

--
-- Table structure for table queue_items
--

DROP TABLE IF EXISTS queue_items;

CREATE TABLE queue_items (
  media_queue_id int unsigned NOT NULL,
  media_item_id int unsigned NOT NULL,
  priority BOOLEAN DEFAULT FALSE,
  status enum('Not Started','In Progress','Completed') DEFAULT 'Not Started',
  CONSTRAINT media_item_fk FOREIGN KEY (media_item_id) REFERENCES media_items(media_item_id),
  CONSTRAINT queue_fk FOREIGN KEY (media_queue_id) REFERENCES media_queues(media_queue_id) ON DELETE CASCADE
);

--
-- Seed data for table queue_items
--

LOCK TABLES queue_items WRITE;
INSERT INTO queue_items (media_queue_id, media_item_id) 
VALUES (1, 1), (1, 2), (1, 5), (2, 3), (2, 4), (2,7);
UNLOCK TABLES;



--
-- Table structure for table genres
--

DROP TABLE IF EXISTS genres;

CREATE TABLE genres (
  genre_id int unsigned NOT NULL AUTO_INCREMENT,
  genre_name varchar(25) NOT NULL DEFAULT 'General',
  PRIMARY KEY (genre_id)
);

--
-- Seed data for table genres
--

LOCK TABLES genres WRITE;
INSERT INTO genres (genre_id, genre_name) VALUES 
(1,'Action'),
(2,'Animation'),
(3,'Children'),
(4,'Classics'),
(5,'Comedy'),
(6,'Computer Science'),
(7,'Documentary'),
(8,'Drama'),
(9,'Education'),
(10,'Family'),
(11,'Foreign'),
(12,'Games'),
(13,'General'),
(14,'Horror'),
(15,'Language Learning'),
(16,'Music'),
(17,'New'),
(18,'Programming'),
(19,'Sci-Fi'),
(20,'Sports'),
(21,'Technology'),
(22,'Travel');
UNLOCK TABLES;


--
-- Table structure for table item_genres
--

DROP TABLE IF EXISTS item_genres;

CREATE TABLE item_genres (
  genre_id int unsigned NOT NULL,
  media_item_id int unsigned NOT NULL,
  CONSTRAINT item_fk FOREIGN KEY (media_item_id) REFERENCES media_items(media_item_id) ON DELETE CASCADE,
  CONSTRAINT genre_fk FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
);

--
-- Seed data for table genres
--

LOCK TABLES item_genres WRITE;
INSERT INTO item_genres (genre_id, media_item_id) VALUES 
(6,1),
(9,1),
(18,1),
(21,1),
(6,2),
(9,2),
(18,2),
(21,2),
(9,3),
(11,3),
(15,3),
(9,4),
(11,4),
(15,4),
(4,5),
(22,5),
(2,6),
(3,6),
(4,6),
(13,7);
UNLOCK TABLES;

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


