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

// console.log(process.env);

let pool = mysql.createPool({
  host  : process.env.CS340_MYSQL_HOST,
  user  : process.env.CS340_MYSQL_USER,
  password: process.env.CS340_MYSQL_PW,
  database: process.env.CS340_MYSQL_DB
});

const TBLNAME = "workouts";

// let pool = mysql.createPool({
//   host  : 'classmysql.engr.oregonstate.edu',
//   user  : 'cs340_cumberwm',
//   password: '[CHANGE ME LATER - NOT IN VERSION CONTROL]',
//   database: 'cs340_cumberwm'
// });

module.exports.getEntries = function getEntries(){
  return new Promise((resolve, reject) => {
    pool.query('SELECT * , DATE_FORMAT(exerciseDate, "%m-%d-%Y") AS exerciseDate FROM ' + TBLNAME + ';', function (err, rows){
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

