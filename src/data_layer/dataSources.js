/********************************************************************************************
 * Author: Mike Cumberworth
 * CS 340, Section 400 Databases Fall 2019 
 * 
 * This file is yet another minor abstraction layer.
 * It brings together all the separate files that make actual database calls.
 * That way they can be maintained separately, or moved, or renamed, and the api.js
 * file that calls through here to reach them never needs to know or care. 
 *******************************************************************************************/

module.exports.users = require('./db_users.js');
module.exports.media_items = require('./db_media_items.js');
module.exports.media_queues = require('./db_media_queues.js');
module.exports.queue_items = require('./db_queue_items.js');
module.exports.genres = require('./db_genres.js');
module.exports.item_genres = require('./db_item_genres.js');