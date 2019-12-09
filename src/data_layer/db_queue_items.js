/********************************************************************************************
 * Author: Sriram Narayanan
 * CS 340, Section 400 Fall 2019 
 *******************************************************************************************/
const pool = require('./db_connection');

/*******************************************
'Queue Items' Functions
*******************************************/
/*Add queue_item to media_queue*/
module.exports.addQueueItems = function addQueueItems(mq_id,mi_id){
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO queue_items(media_queue_id,media_item_id) VALUES (?,?);',[mq_id, mi_id], function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results in addQueueItems: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}
/*Get all queue_items for queue*/
module.exports.getAllQueueItems = function getAllQueueItems(id){
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM queue_items q 
    LEFT JOIN media_queues mq ON mq.media_queue_id = q.media_item_id
    LEFT JOIN media_items m ON mq.media_queue_id = m.media_item_id WHERE mq.media_queue_id = ?;`,[passed_in_id], function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        reject(err);
      }
      console.log("Results from getAllItems: ", rows);
      resolve(JSON.stringify(rows));
    });
  });
}
 /*Update queue_item (status, priority)*/
 module.exports.updateQueueItem = function(body,id){
  console.log('UpdateQueueItem id',id);
  return new Promise((resolve, reject) => {
    pool.query('UPDATE queue_items SET media_queue_id = ?, media_item_id = ? WHERE media_queue_id = ?',[body.media_queue_id, body.media_item_id, id], function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results in updateQueueItem: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}
 /*Remove queue_item */
 module.exports.removeQueueItems = function(id){
  //Deletes a queue item
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM queue_items WHERE media_item_id = ?',[id], function (err, rows){
      if (err){
        console.log("ERROR DELETING QUEUE ITEM");
        return reject(err);
      }
      console.log("QUEUE ITEM DELETED FROM DATABASE: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}
 /*Remove all queue_items from queue*/
 module.exports.removeQueueItems = function(id){
  //Deletes a queue item
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM queue_items WHERE media_queue_id = ?`,[id], function (err, rows){
      if (err){
        console.log("ERROR DELETING QUEUE ITEMS TABLE");
        return reject(err);
      }
      console.log("QUEUE DELETED FROM DATABASE: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}