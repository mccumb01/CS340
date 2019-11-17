-- CS 340 Databases
-- Authors: Mike Cumberworth, Sriram Narayanan
-- "Tsundoku" Final Project 
-- Database Manipulation queries
-- Fall 2019


-- Insert into media_items from iTunes API
INSERT INTO media_items(media_type,title,original_language_title, publication_year, avg_user_rating, genre) VALUES (:media_type_from_dropdown,:title_from_API,:original_language_title_from_API, :publication_year_from_API, :avg_user_rating_from_API, :genre_from_API);

-- Insert into media_items from user input
INSERT INTO media_items(media_type,title,original_language_title, publication_year, genre) VALUES (:media_type_from_dropdown,:title_from_API,:original_language_title_from_API, :publication_year_from_API, :avg_user_rating_from_API);

--Update media items from user_input
UPDATE media_items SET media_type = :media_type_from_dropdown,title =:title_from_user_input,original_language_title=:original_language_title_from_user, publication_year=:publication_year_from_user, genre=:genre_from_user WHERE queue_item_id = :id_delete_button_pressed_by_user;

--Delete
DELETE FROM media_items WHERE queue_item_id = :id_delete_button_pressed_by_user;