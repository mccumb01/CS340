/********************************************************************************************
 * Author: Mike Cumberworth
 * CS 340, Section 400 Web Development Summer 2019 
 *******************************************************************************************/

const mysql = require ('mysql');
const fs = require('fs');
const path = require('path');
module.exports.users = require('./db_users.js');
module.exports.media_items = require('./db_media_items.js');
module.exports.media_queues = require('./db_media_queues.js');
module.exports.queue_items = require('./db_queue_items.js');
module.exports.genres = require('./db_genres.js');
module.exports.item_genres = require('./db_item_genres.js');

/*******************************************
DB Queries TODO 
  
 Add media_queue for user 
 Get all media_queues for user
 Get media_queue (for user) by queue_id
 Delete media_queue (and cascade delete all its queue_items)

 Add queue_item to media_queue
 Get all queue_items for queue
 Update queue_item (status, priority)
 Remove queue_item 
 Remove all queue_items from queue
  *******************/ 