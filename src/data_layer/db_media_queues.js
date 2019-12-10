/********************************************************************************************
 * Author: Sriram Narayanan & Mike Cumberworth
 * CS 340, Section 400 Databases Fall 2019 
 *******************************************************************************************/
const pool = require('./db_connection');

/*******************************************
'Media Queue' Functions
*******************************************/

/*Add media_queue for user*/ 
module.exports.addMediaQueueForUser = function addMediaQueueForUser(id, body){
  return new Promise((resolve, reject) => {
    let name = null;
    if (body.list_name){
      name = body.list_name;
    }
    pool.query('INSERT INTO media_queues(user_id, list_name) VALUES (?, ?);', [id, name] , function (err, rows){
      if (err){
        console.log("ERROR CREATING NEW MEDIA QUEUE");
        return reject(err);
      }
      console.log("Results getMediaQueueForUser: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}

/*Get all media_queues for user - used to populate dropdown list */
module.exports.getMediaQueuesForUser = function getMediaQueuesForUser(id){
  return new Promise((resolve, reject) => {
    pool.query('SELECT media_queue_id FROM media_queues WHERE user_id = ?;', [id] , function (err, rows){
      if (err){
        console.log("ERROR GETTING MEDIA QUEUE FOR USER");
        return reject(err);
      }
      console.log("Results getMediaQueueForUser: ", JSON.stringify(rows));
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
        console.log("ERROR DELETING MEDIA QUEUE");
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
        console.log("ERROR DELETING ALL QUEUES FOR USER");
        return reject(err);
      }
      console.log("Results in deleteAllQueuesForUser: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}