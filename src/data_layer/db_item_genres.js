/********************************************************************************************
 * Author: Mike Cumberworth
 * CS 340, Section 400 Web Development Summer 2019 
 *******************************************************************************************/

const pool = require('./db_connection');


/*******************************************
'Genres' Functions
*******************************************/
module.exports.getGenresForItem = function getGenresForItem(id){
  return new Promise((resolve, reject) => {
    pool.query('SELECT genre_id FROM item_genres WHERE media_item_id = ?;', [id] , function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results in dataSources: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}

module.exports.getItemsOfGenre = function getItemsOfGenre(genre_id){
  return new Promise((resolve, reject) => {
    pool.query('SELECT media_item_id FROM item_genres WHERE genre_id = ?;', [genre_id], function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results in dataSources: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}
module.exports.setGenresForItem = function setGenresForItem(item_id, genres){
  let igs = [];
  for (let i = 0; i < genres.length; i++) {
    igs[i] = [item_id, genres[i]];
  }
  console.log("Genres to add to item: ", igs);
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO item_genres (media_item_id, genre_id) VALUES ?;',[igs], function (err, rows){
      if (err){
        console.log("ERROR INSERTING GENRES FOR ITEM");
        return reject(err);
      }
      console.log("Results in dataSources: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}