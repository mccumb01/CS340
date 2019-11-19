/********************************************************************************************
 * Author: Mike Cumberworth
 * CS 340, Section 400 Web Development Summer 2019 
 *******************************************************************************************/

const pool = require('./db_connection');

/*******************************************
'User' Database Functions 
*******************************************/
module.exports.authenticateUser = function authenticateUser(body) {
  console.log("Authenticating user against DB!", body);
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE username = ?;',[body.username] ,function (err, rows){
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
    pool.query('INSERT INTO users (username, user_email) VALUES (?,?);',[body.username, body.user_email], function (err, rows){
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
    pool.query('SELECT * FROM users WHERE user_id = ?;',[parseInt(id)] ,function (err, rows){
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
