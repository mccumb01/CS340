/********************************************************************************************
 * Author: Sriram Narayanan
 * CS 340, Section 400 Fall 2019 
 *******************************************************************************************/
const pool = require('./db_connection');

/*******************************************
'Queue Items' Functions
*******************************************/
/*Get all queue_items for queue*/
module.exports.getItemsForQueue = function getItemsForQueue(id){
  return new Promise((resolve, reject) => {
    pool.query(`SELECT m.title, q.status, q.priority FROM queue_items q 
    LEFT JOIN media_queues mq ON mq.media_queue_id = q.media_item_id
    LEFT JOIN media_items m ON mq.media_queue_id = m.media_item_id WHERE mq.media_queue_id = ?;`,[id], function (err, rows){
      if (err){
        console.log("ERROR GETTING QUEUE ITEMS");
        reject(err);
      }
      console.log("Results from getAllItems: ", rows);
      resolve(JSON.stringify(rows));
    });
  });
}

/*Add queue_item to media_queue*/
module.exports.addQueueItem = function addQueueItem(body){
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO queue_items(media_queue_id, media_item_id, date_added, priority, status) VALUES (?,?,?,?,?);',
        [body.mq_id, body.mi_id, Date.now().toISOString(), body.priority, body.status], 
        function (err, rows){
      if (err){
        console.log("ERROR ADDING QUEUE ITEM");
        return reject(err);
      }
      console.log("Results in addQueueItems: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}
 /*Update queue_item (status, priority)*/
 module.exports.updateQueueItem = function(body,id){
  console.log('UpdateQueueItem id',id);
  return new Promise((resolve, reject) => {
    pool.query('UPDATE queue_items SET media_queue_id = ?, media_item_id = ?, priority = ?, status = ? WHERE media_queue_id = ?',
        [body.media_queue_id, body.media_item_id, body.priority, body.status], function (err, rows){
      if (err){
        console.log("ERROR UPDATING QUEUE ITEM");
        return reject(err);
      }
      console.log("Results in updateQueueItem: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}
 /*Remove queue_item */
 module.exports.removeQueueItem = function(id){
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
 module.exports.clearQueue = function(id){
  //Deletes a queue item
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM queue_items WHERE media_queue_id = ?`,[id], function (err, rows){
      if (err){
        console.log("ERROR CLEARING QUEUE");
        return reject(err);
      }
      console.log("QUEUE ITEMS REMOVED", JSON.stringify(rows));
      resolve(rows);
    });
  });
}