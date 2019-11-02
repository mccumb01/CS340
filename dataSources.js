/********************************************************************************************
 * Author: Mike Cumberworth
 * CS 290, Section 400 Web Development Summer 2019 
 * 
 * Assignment Database Interaction
 * External sites referenced while working on the SQL data-layer portion of this project:
 * https://stackoverflow.com/questions/50409788/mysql-8-create-new-user-with-password-not-working
 * https://stackoverflow.com/questions/1498777/how-do-i-show-the-schema-of-a-table-in-a-mysql-database
 * https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
 * https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
 * https://stackoverflow.com/questions/36547292/use-promise-to-process-mysql-return-value-in-node-js
 * https://dev.mysql.com/doc/refman/5.5/en/date-and-time-functions.html#function_date-format
 * ******************************************************************************************/

const mysql = require ('mysql');

let pool = mysql.createPool({
  host  : process.env.CS340_MYSQL_HOST + ":" + process.env.CS340_MYSQL_PORT,
  user  : process.env.CS340_MYSQL_USER,
  password: process.env.CS340_MYSQL_PW,
  database: process.env.CS340_MYSQL_DB
});


/*******************************************
SQL Tables 
*******************************************/
const users = "users";
const hashed_creds = "hashed_creds";
const media_items = "media_items";
const media_queues = "media_queues";
const queue_items = "queue_items";
const genres = "genres";
const item_genre = "media_items";

module.exports.resetTable = function(tableName){
  // Match tableName to existing tables. If it doesn't match exactly, return

  // DROP TABLE tableName IF EXISTS
  // Call the appropriate SQL procedure to recreate tableName
}


/*******************************************
Individual DB Queries
 
 Add new user
 Get user by id
 Edit user with id
 Delete user with id (and cascade delete media_queues and queue_items for that user?)
 
 Add new media_item
 Get all media_items
 Get media_item by id
 Edit media_item with id
 Delete media_item with id
 
 Add media_queue for user 
 Get all media_queues for user
 Get media_queue (for user) by queue_id
 Delete media_queue (and cascade delete all its queue_items)

 Add queue_item to media_queue
 Get all queue_items for queue
 Update queue_item (status, priority)
 Remove queue_item 
 Remove all queue_items from queue

 Add genre to media_item
 Update genres for media_item
 Remove genre from media_item
 Add new genre(?)

*******************************************/

module.exports.getEntries = function getEntries(){
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM ' + TBLNAME + ';', function (err, rows){
      if (err){
      //  console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      //console.log("Results in dataSources: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}

module.exports.getEntryById = function getEntryById(id){
  return new Promise((resolve, reject) => {
    pool.query('SELECT *, DATE_FORMAT(exerciseDate, "%m-%d-%Y") AS exerciseDate FROM ' + TBLNAME + ' WHERE id = ?;', [parseInt(id)], function (err, rows){
      if (err){
       // console.log("ERROR GETTING ENTRY");
        return reject(err);
      }
     // console.log("Results in dataSources: ", JSON.stringify(rows));
      resolve(rows);
    });
  });

}

module.exports.createEntry = function createEntry(body){

  if (body.weight == ''){
    body.weight = null;
  }

  if (body.exerciseDate == ''){
    body.exerciseDate == null;
  }

  if (body.numReps == ''){
    body.numReps == null;
  }

  return new Promise((resolve, reject) => {pool.query('INSERT into ' + TBLNAME + 
  ' (exerciseName, numReps, weight, exerciseDate, unit ) VALUES (?, ?, ?, ?, ?);', 
  [body.exerciseName, body.numReps, body.weight, body.exerciseDate, body.unit], 
    (err, result, fields) => {
      if (err){
        return reject(err);
      }
      resolve(result);
    });
  }); 
}

module.exports.updateEntryWithId = function updateEntryWithId(id, body){
  return new Promise((resolve, reject) => {
    pool.query('UPDATE ' + 
    TBLNAME + 
    ' SET exerciseName=?, numReps=?, weight=?, exerciseDate=?, unit=? WHERE id=?;', 
    [body.exerciseName, body.numReps, body.weight, body.exerciseDate, body.unit, id], 
    (err, result, fields) => {
      if (err){
        return reject(err);
      }
      // console.log("Updated!?", result);
      resolve(result);
    });
  }); 
}

module.exports.deleteEntryWithId = function deleteEntryWithId(id){
  return new Promise((resolve, reject) => {pool.query('DELETE FROM ' + TBLNAME + 
  ' WHERE id = ?;', [id], 
    (err, result) => {
      if (err){
        return reject(err);
      }
      resolve(result);
    });
  }); 
}

module.exports.resetTable = function resetTable() {
  return Promise.resolve(pool.query(`DROP TABLE IF EXISTS ${TBLNAME}`, (err) =>{
    var createString = `CREATE TABLE ${TBLNAME}(
    id INT PRIMARY KEY AUTO_INCREMENT,
    exerciseName VARCHAR(255) NOT NULL,
    numReps INT,
    weight INT,
    exerciseDate DATE,
    unit ENUM('lb', 'kg', ''))`;
    pool.query(createString, function(err){
      if (err){
       // console.log("Error resetting table", err);
      }
      return "Table reset";
    })
  }));
}

module.exports.nukeDB = function nukeDB(){
  // SELECT CONCAT('DROP TABLE IF EXISTS ', table_name, ';')
  // FROM information_schema.tables
  // WHERE table_schema = 'tsundoku';
  // this.resetTable();??
}

