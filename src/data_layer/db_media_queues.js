/********************************************************************************************
 * Author: Sriram Narayanan
 * CS 340, Section 400 Fall 2019 
 *******************************************************************************************/
const pool = require('./db_connection');

/*******************************************
'Media Queue' Functions
*******************************************/
module.exports.addMediaQueueForUser = function addMediaQueueForUser(id, body){
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO media_queues(media_queue_id,user_id)  VALUES (?,?);', [body.media_queue,id] , function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results getMediaQueueForUser: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}
module.exports.getMediaQueueForUser = function getMediaQueueForUser(id){
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM media_queues WHERE user_id = ?;', [id] , function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results getMediaQueueForUser: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}

module.exports.getMediaQueues = function getMediaQueues(id){
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM media_queues WHERE queue_id = ?;', [id], function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results in getMediaQueues: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}
/*Add media_queue for user 
 Get all media_queues for user
 Get media_queue (for user) by queue_id
 Delete media_queue (and cascade delete all its queue_items)*/
module.exports.deleteMediaQueues = function deleteMediaQueues(id){
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM media_queues WHERE media_item_id = ?;',[id], 
    function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results in deleteMediaQueues: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}