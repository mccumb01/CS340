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
const fs = require('fs');
const path = require('path');

let pool = mysql.createPool({
  host  : process.env.CS340_MYSQL_HOST, //+ ":" + process.env.CS340_MYSQL_PORT,
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


/*******************************************
'User' Functions 
*******************************************/
module.exports.authenticateUser = function authenticateUser(body) {
  console.log("Authenticating user against DB!", body);
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM ' + users + ' WHERE username = ?;',[body.username] ,function (err, rows){
      if (err || rows.length < 1 ){
      console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Result from DB: ", JSON.stringify(rows[0]));
      resolve(rows[0]);
    });
  });
}

module.exports.createUser = function(body){
  //check if user exists, if not create one.
  console.log('body: ', body);
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO ' + users + ' (username, user_email) VALUES (?,?);',[body.username, body.user_email], function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results in dataSources: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}

module.exports.getAllUsers = function getAllUsers() {
  console.log("getAllUsers called in dataSources");
  return new Promise((resolve, reject) => {
    pool.query('SELECT * from users', (err, rows) => {
      if (err){
        console.log("Error getting all users");
        return reject(err);
      }
      resolve(rows);
    });
  });
}

module.exports.getUserById = function getUserById(id){
  console.log("GET USER CALLED IN DATASOURCES! id: ", id);
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM ' + users + ' WHERE user_id = ?;',[parseInt(id)] ,function (err, rows){
      if (err){
      console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      // console.log("Results in dataSources: ", JSON.stringify(rows));
      resolve(rows[0]);
    });
  });
}

module.exports.updateUser = function(body){
  //check if user exists, if not create one.
  console.log('body: ', body);
  return new Promise((resolve, reject) => {
    pool.query('UPDATE users SET username = ?, user_email = ? WHERE user_id = ?',[body.username, body.user_email, parseInt(body.user_id)], function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results in dataSources: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}

/*******************************************
'Media Items' Functions
*******************************************/

module.exports.MEDIA_TYPES = ['Book','Movie','Audio Album','Periodical','Short'];

module.exports.getAllItems = function getAllItems(){
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM media_items;', function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results in dataSources: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}

module.exports.getMediaTypes = function getMediaTypes(){
  return Promise.resolve(dataSources.getMediaTypes());
}

module.exports.getItemById = function getItemId(id){
  return dataSources.getItemById(id);
}

module.exports.addItem = function addItem(body){
  return dataSources.addItem(body);
}

module.exports.updateItemWithId = function updateItemWithId(id, body){
  return dataSources.updateItemWithId(id, body);
}

module.exports.updateItems = function updateItems(body){
  return dataSources.updateItems(body);
}

module.exports.deleteItemWithId = function deleteItemWithId(id){
  return dataSources.deleteItemWithId(id);
}

/*******************************************
'Media Items' Functions
*******************************************/
module.exports.getAllGenres = function getAllGenres(){
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM genres;', function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results in dataSources: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}

module.exports.getGenreWithId = function getGenreWithId (body){
  return Promise.resolve(dataSources.getGenreWithId(body));
}

module.exports.addGenre = function addGenre (body){
  return dataSources.addGenre(body);
}

module.exports.updateGenreWithId = function updateGenreWithId(id, body){
  return dataSources.updateGenreWithId(id, body);
}

module.exports.deleteGenreWithId = function deleteGenreWithId(id){
  return dataSources.deleteGenreWithId(id);
}


// module.exports.getEntryById = function getEntryById(id){
//   return new Promise((resolve, reject) => {
//     pool.query('SELECT *, DATE_FORMAT(exerciseDate, "%m-%d-%Y") AS exerciseDate FROM ' + TBLNAME + ' WHERE id = ?;', [parseInt(id)], function (err, rows){
//       if (err){
//        // console.log("ERROR GETTING ENTRY");
//         return reject(err);
//       }
//      // console.log("Results in dataSources: ", JSON.stringify(rows));
//       resolve(rows);
//     });
//   });

// }

// module.exports.createEntry = function createEntry(body){

//   if (body.weight == ''){
//     body.weight = null;
//   }

//   if (body.exerciseDate == ''){
//     body.exerciseDate == null;
//   }

//   if (body.numReps == ''){
//     body.numReps == null;
//   }

//   return new Promise((resolve, reject) => {pool.query('INSERT into ' + TBLNAME + 
//   ' (exerciseName, numReps, weight, exerciseDate, unit ) VALUES (?, ?, ?, ?, ?);', 
//   [body.exerciseName, body.numReps, body.weight, body.exerciseDate, body.unit], 
//     (err, result, fields) => {
//       if (err){
//         return reject(err);
//       }
//       resolve(result);
//     });
//   }); 
// }

// module.exports.updateEntryWithId = function updateEntryWithId(id, body){
//   return new Promise((resolve, reject) => {
//     pool.query('UPDATE ' + 
//     TBLNAME + 
//     ' SET exerciseName=?, numReps=?, weight=?, exerciseDate=?, unit=? WHERE id=?;', 
//     [body.exerciseName, body.numReps, body.weight, body.exerciseDate, body.unit, id], 
//     (err, result, fields) => {
//       if (err){
//         return reject(err);
//       }
//       // console.log("Updated!?", result);
//       resolve(result);
//     });
//   }); 
// }

// module.exports.deleteEntryWithId = function deleteEntryWithId(id){
//   return new Promise((resolve, reject) => {pool.query('DELETE FROM ' + TBLNAME + 
//   ' WHERE id = ?;', [id], 
//     (err, result) => {
//       if (err){
//         return reject(err);
//       }
//       resolve(result);
//     });
//   }); 
// }

module.exports.resetTable = function resetTable(tableName) {
  return Promise.resolve(pool.query(`DELETE FROM ${tableName}`, 
  (err) =>{ console.log("Error emptying table") }));
}

module.exports.nukeDB = function nukeDB(){

  const replaceNewlines = /;|\n*/g;
  const initialSQL = fs.readFileSync(path.join(__dirname, '/initial_sql.txt'), {encoding: 'UTF-8'}).split(';\n');
  for (let query of initialSQL) {
    query.replace(replaceNewlines,'');
    query = query.trim();
    console.log('Query: ' + query + ';');
    pool.query(query, 
      (err) => console.log("Error resetting database", err ));
  }
}

