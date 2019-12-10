/********************************************************************************************
 * Author: Mike Cumberworth
 * CS 340, Section 400 Web Development Summer 2019 
 * 
 * Initially intended to be used for creating Data Transfer Objects and Mocks for testing.
 * This layer would mimic and abstract the actual database table structure.
 * Wound up not using it, but keeping it here for when I can go back and add more tests.
 
 ********************************************************************************************/

module.exports.User = function(obj){ 
                        this.user_id = obj.user_id || null; 
                        this.username = obj.username || ""; 
                        this.user_email = obj.user_email || ""; 
                        Object.assign(this, obj);
                      };

module.exports.MediaQueue = { media_queue_id: null, 
                              user_id: null 
                            };

module.exports.QueueItem = { queue_item_id: null,
                             media_queue_id: null, 
                             media_item_id: null,
                             date_added: null,
                             priority: false,
                             status: null
                           };

module.exports.MediaItem = { media_item_id: null, 
                             title: "", 
                             original_language_title: "", 
                             media_type: null, 
                             publication_year: "", 
                             avg_rating: null 
                            };

module.exports.Genre = {genre_id: null, genre_name: ""};

// This one should only be necessary in the database, not here ...
// module.exports.ItemGenre = {genre_id: null, media_item_id: null};
