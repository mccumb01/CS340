/********************************************************************************************
 * Author: Sriram Narayanan
 * CS 340, Section 400 Fall 2019 
 *******************************************************************************************/
const pool = require('./db_connection');

/*******************************************
'Media Queue' Functions
*******************************************/
/*Add media_queue for user*/ 
module.exports.addMediaQueueForUser = function addMediaQueueForUser(id, body){
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO media_queues(user_id) VALUES (?);', [id] , function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results getMediaQueueForUser: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}

 /*Get all media_queues for user*/
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

 /*Get media_queue (for user) by queue_id*/
module.exports.getMediaQueuesByQueueId = function getMediaQueuesByQueueId(id){
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM media_queues WHERE media_queue_id = ?;', [id], function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results in getMediaQueuesByQueueId: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}

 /*Delete media_queue (and cascade delete all its queue_items)*/
module.exports.deleteMediaQueue = function deleteMediaQueues(id){
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM media_queues WHERE media_queue_id = ?;',[id], 
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

module.exports.deleteAllQueuesForUser = function deleteMediaQueues(id){
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM media_queues WHERE user_id = ?;',[id], 
    function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results in deleteAllQueuesForUser: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}