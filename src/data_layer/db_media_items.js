const pool = require('./db_connection');

/*******************************************
'Media Items' Functions
*******************************************/

module.exports.MEDIA_TYPES = ['Book','Movie','Audio Album','Periodical','Short'];

// Work in progress to have 1 generic query handler to take all the strings & params... 
// function executeQuery(body, queryString, params){
//   return new Promise((resolve, reject) => {
//     pool.query(queryString, params, function (err, rows){
//       if (err){
//         console.log("ERROR GETTING ENTRIES");
//         return reject(err);
//       }
//       console.log("Results in dataSources: ", JSON.stringify(rows));
//       resolve(rows);
//     });
//   });
// }

module.exports.getAllItems = function getAllItems(){
  return new Promise((resolve, reject) => {
    pool.query(`SELECT m.media_item_id, title, original_language_title, media_type, 
                publication_year, avg_user_rating, g.genre_id, g.genre_name 
                FROM media_items m 
                LEFT JOIN item_genres ig ON m.media_item_id = ig.media_item_id
                LEFT JOIN genres g ON g.genre_id = ig.genre_id;`, function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        reject(err);
      }
      console.log("Results from getAllItems: ", rows);
      resolve(JSON.stringify(rows));
    });
  });
}

module.exports.getItemById = function getItemId(id){
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM media_items WHERE media_item_id = ?;',[body.media_item_id], function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results in dataSources: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}

module.exports.getItemByTitle = function getItemByTitle(body){
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM media_items WHERE title LIKE ? OR original_language_title LIKE ?;',[body.title, body.original_language_title], function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results in dataSources: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}

module.exports.getItemByType = function getItemByType(body){
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM media_items WHERE media_type = ?;',[body.media_type], function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results in dataSources: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}

module.exports.addItem = function addItem(body){
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO media_items (media_type, title, original_language_title, publication_year, avg_user_rating) VALUES (?,?,?,?,?);',
                [body.media_type, body.title, body.original_language_title, body.publication_year, body.avg_user_rating], 
                function (err, rows){
      if (err){
        console.log("ERROR ADDING ENTRY");
        return reject(err);
      }
      console.log("Results in dataSources: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}

module.exports.updateItemWithId = function updateItemWithId(id, body){
  return new Promise((resolve, reject) => {
    pool.query('UPDATE media_items SET media_type = ?, title = ?, original_language_title = ?, publication_year = ?, avg_user_rating = ? WHERE media_item_id = ?;',
                [body.media_type, body.title, body.original_language_title, body.publication_year, body.avg_user_rating, id], 
                function (err, rows){
      if (err){
        console.log("ERROR UPDATING ENTRY");
        return reject(err);
      }
      console.log("Results in dataSources: ", JSON.stringify(rows));
      resolve(rows);
    });
  });}

module.exports.deleteItemWithId = function deleteItemWithId(id){
  return new Promise((resolve, reject) => {
    //pool.query('DELETE FROM item_genres ig WHERE ig.media_item_id = ?;', [id], (err, rows) =>{});
    
    pool.query('DELETE FROM media_items WHERE media_item_id = ?;',[id], 
                function (err, rows){
      if (err){
        console.log("ERROR GETTING ENTRIES");
        return reject(err);
      }
      console.log("Results in dataSources: ", JSON.stringify(rows));
      resolve(rows);
    });
  });
}
