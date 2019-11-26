/********************************************************************************************
 * Author: Mike Cumberworth
 * CS 340, Section 400 Web Development Summer 2019 
 *******************************************************************************************/

const pool = require('./db_connection');


/*******************************************
'Genres' Functions
*******************************************/
module.exports.getAllGenres = function getAllGenres(){
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM genres ORDER BY genre_name;', function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results of getAllGenres: ", rows);
      resolve(rows);
    });
  });
}

module.exports.getGenreWithId = function getGenreWithId (body){
  return Promise.resolve(dataSources.getGenreWithId(body));
}

module.exports.addGenre = function addGenre (body){
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO genres (genre_name) VALUES (?);',[body.genre_name], function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      //console.log("Results in dataSources: ", JSON.stringify(rows));
      resolve(rows);
    });
  });}

module.exports.updateGenreWithId = function updateGenreWithId(id, body){
  return new Promise((resolve, reject) => {
    pool.query('UPDATE genres SET genre_name = ? WHERE genre_id = ?;',[body.genre_name, body.genre_id], function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results of updateGenreWithId: ", JSON.stringify(rows));
      resolve(rows);
    });
  });}

module.exports.deleteGenreWithId = function deleteGenreWithId(id){
  
}

