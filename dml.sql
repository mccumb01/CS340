-- CS 340 Databases
-- Authors: Mike Cumberworth, Sriram Narayanan
-- "Tsundoku" Final Project 
-- Database Manipulation queries
-- Fall 2019

-------------------------------------------------------------------------------------------------
-- USERS TABLE

-- Get all users (testing only; no purpose in the app right now)
SELECT user_id, username, user_email from users; 

-- Get an individual user by user_id
SELECT user_id, username, user_email FROM users WHERE user_id = :user_id;

-- Get an individual user by matching username
-- Note: for now this doubles as login/authentication, since we don't have that in place
SELECT username, user_email from users u WHERE username = u.username;

-- Add a new user
INSERT INTO users (username, user_email) VALUES (:username,:user_email);

-- Edit an existing user
UPDATE users SET username = :username, user_email = :user_email WHERE user_id = :user_id;

-- Delete an individual user with matching user_id
DELETE FROM users WHERE user_id = :user_id;
-------------------------------------------------------------------------------------------------

-- MEDIA ITEMS TABLE

-- Get all media items
SELECT media_item_id, media_type, title, original_language_title, publication_year, avg_user_rating
  FROM media_items; 

-- Get a single media_item by id
SELECT media_item_id, media_type, title, original_language_title, publication_year, avg_user_rating 
  FROM media_items WHERE media_item_id = :media_item_id; 

-- Get all media_items with matching English title or original language title 
SELECT media_item_id, media_type, title, original_language_title, publication_year, avg_user_rating
  FROM media_items WHERE title LIKE :title OR original_language_title LIKE :original_language_title;  

-- Get all media_item by media type (book, movie, etc)
SELECT media_item_id, media_type, title, original_language_title, publication_year, avg_user_rating
  FROM media_items WHERE media_type = :media_type;

-- Get all media_item by publication year 
SELECT media_item_id, media_type, title, original_language_title, publication_year, avg_user_rating
  FROM media_items WHERE publication_year = :publication_year;

-- Get all media_item with rating greater than :rating 
SELECT media_item_id, media_type, title, original_language_title, publication_year, avg_user_rating
  FROM media_items WHERE avg_user_rating NOT NULL and avg_user_rating > :avg_user_rating;

-- Add a new media_item 
INSERT INTO media_items (media_type, title, original_language_title, publication_year, avg_user_rating) 
  VALUES (:media_type, :title, :original_language_title, :publication_year, :avg_user_rating)

-- Update an existing media_item 
UPDATE media_items SET media_type = :media_type, 
                       title = :title, 
                       original_language_title = :original_language_title, 
                       publication_year = :publication_year, 
                       avg_user_rating = :avg_user_rating;

-- Delete a single media_item with the matching ID
DELETE FROM media_items WHERE media_item_id = :media_item_id;

-- Delete all media_items from the entire database, which we shouldn't want to do or allow
DELETE FROM media_items;

-------------------------------------------------------------------------------------------------

-- GENRES TABLE

-- Get all genres
SELECT genre_id, genre_name FROM genres ORDER BY genre_name; 

-- Get single genre by id
SELECT genre_id, genre_name FROM genres WHERE genre_id = :genre_id; 

-- Get all genres for a particular item
SELECT genre_id, genre_name FROM genres g 
  JOIN item_genres ig ON g.genre_id = ig.genre_id
  JOIN media_items m ON m.media_item_id = ig.media_item_id
  WHERE m.media_item_id = :media_item_id_to_match  

-- Add a new genre
INSERT INTO genres (genre_name) VALUES (:genre_name); 

-- Edit an existing genre
UPDATE genres SET genre_name = :genre_name WHERE genre_id = :genre_id; 

-- Delete a genre, which we probably don't want to allow as it would delete it from every media item.
DELETE FROM genres WHERE genre_id = :genre_id; 

-------------------------------------------------------------------------------------------------

-- ITEM_GENRES TABLE


-- Get all items matching a particular genre
SELECT m.media_item_id, title, original_language_title, publication_year media_type, avg_user_rating from media_items m 
JOIN item_genres ig ON m.media_item_id = ig.media_item_id 
JOIN genres g ON g.genre_id = ig.genre_id 
WHERE g.genre_name = :user_filter_genre;

-- Get all genres for a particular item
SELECT genre_id, genre_name FROM genres g 
  JOIN item_genres ig ON g.genre_id = ig.genre_id
  JOIN media_items m ON m.media_item_id = ig.media_item_id
  WHERE m.media_item_id = :media_item_id_to_match  

-- Set genres for a particular item
-- Not sure how to do this in a loop w/just SQL; using Express mysql to pass an array of items & genres
INSERT INTO item_genres (media_item_id, genre_id) VALUES (:passed_media_item, :passed_genres);