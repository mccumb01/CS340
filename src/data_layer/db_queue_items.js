/********************************************************************************************
 * Author: Sriram Narayanan
 * CS 340, Section 400 Fall 2019 
 *******************************************************************************************/
const pool = require('./db_connection');

/*******************************************
'Queue Items' Functions
*******************************************/
/*
 Add queue_item to media_queue
 Get all queue_items for queue
 Update queue_item (status, priority)
 Remove queue_item 
 Remove all queue_items from queue*/

module.exports.addQueueItems = function getQueueItems(id){
  return new Promise((resolve, reject) => {
    pool.query('INSERT  FROM queue_item WHERE media_queue_id = ?;', [id], function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results in getQueueItems: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}