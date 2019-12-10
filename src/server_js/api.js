/********************************************************************************************
 * Author: Mike Cumberworth
 * CS 340, Section 400 Databases Fall 2019 
 * 
 * This file is an abstraction layer between the routes/endpoints and the actual database calls.
 * It groups functions in a sort of "Controller" approach, to facilitate testing without
 * hitting the actual database, if used with mocks and fakes. This would also allow for easy
 * swapping out of the actual database code, which is tightly coupled to MySQL and the npm
 * mysql module.  
 * 
 * This file also serves as the only real "middleware" of the app, handling the fetching and 
 * transformation of database results into a format suitable for passing back to clients. 
 * For example, this is where multiple table rows from item_genres get combined into a single entry
 * for an item, with an array of associated genres the client needs to display.
 * 
 * - UsersController
 * - MediaQueueController
 * - QueueItemsController
 * - MediaItemsController
 * - GenreController
 *  
 *******************************************************************************************/

const dataSources = require ('../data_layer/dataSources');
const models = require ('./models');

/************************************************
API for Users Controller
************************************************/
module.exports.UserController = {
  createUser : function createUser(body){
    //check if user exists, if not create one.
    // return new models.User(body);
    return Promise.resolve(dataSources.users.createUser(body))
                  .catch(err => {
                    console.log("Error creating user " , err)
                    throw err;
                  });
  },
  authenticateUser : function authenticateUser(body){
  // validate username & password match stored hashes, return T/F.
    console.log("dataSources in API:", dataSources);
    return Promise.resolve(dataSources.users.authenticateUser(body))
                  .catch(err => {
                    console.log("Error authenticating user " , err)
                    throw err;
                  });
  },

  getAllUsers : function getAllUsers(){
    console.log("getAllUsers called in API");
    return Promise.resolve(dataSources.users.getAllUsers())
          .catch(err => console.log(err))
          .then(val=> console.log(val));
  },
                
  getUserById : function getUserById(id){
    console.log("GET USER CALLED IN API.JS! id: ", id);
    return Promise.resolve(dataSources.users.getUserById(id));
  },
  
  updateUser : function updateUser(body){
    return Promise.resolve(dataSources.users.updateUser(body));
  },
                
  deleteUser : function deleteUser(id){
    // authenticateUser(body).then()  
    return Promise.resolve(
        dataSources.users.deleteUser(id)
      );
    }
  }

/************************************************
API for MediaQueue Controller
************************************************/
module.exports.MediaQueueController = {
  createNewQueue : function(user_id) {
    // create a new media queue;
    return Promise.resolve(
      dataSources.media_queues.addMediaQueueForUser(user_id)
    )
    .catch(err => console.log("API Error creating media queue for user"));
  },
  getQueueById : function(queue_id) {
    // create a new media queue;
    return Promise.resolve(
      dataSources.media_queues.getMediaQueuesByQueueId(queue_id)
    )
    .catch(err => console.log("API Error creating media queue for user"));
  },  
  deleteMediaQueueWithId : function(queueId){
    // delete the given queue from the database.
    return Promise.resolve(
      dataSources.media_queues.deleteMediaQueue(queue_id)
    )
    .catch(err => console.log("API Error deleting media queue"));
  },
  getPriorityItems : function getPriorityItems(){
    return Promise.resolve(
      [{"title" : "Book1", 
        "mediaType" : "book", 
        "originalTitle" : "El Libro Numero Uno", 
        "priority" : true}
      ]);
  // return dataSources.getAllItems() & filter? Or have a separate query?;
  },  
}

/************************************************
API for QueueItems Controller
************************************************/
module.exports.QueueItemsController = {
  getItemsForQueue : function(queueId){
    // add an item to to queue with the given id 
    return Promise.resolve(
      dataSources.queue_items.getItemsForQueue(queue_id)
    )
    .catch(err => console.log("API Error getting queue items"));
  },
  addQueueItem : function(body){
    // add an item to to queue with the given id 
    return Promise.resolve(
      dataSources.queue_items.addQueueItem(body)
    )
    .catch(err => console.log("API Error adding queue item"));
  },
  updateQueueItem : function(body){
    // update a given item in a given queue - could be updates to title, author, status, or priority
    return Promise.resolve(
      dataSources.queue_items.updateQueueItem(body)
    )
    .catch(err => console.log("API Error adding queue item"));
  },
  removeQueueItem : function(item_id, queueId){
    // removes an item from a queue; does not remove the item from the database.
    return Promise.resolve(
      dataSources.queue_items.removeQueueItem(item_id, queue_id)
    )
    .catch(err => console.log("API Error removing queue item"));
  },
  clearQueue : function(queue_id){
    return Promise.resolve(
      dataSources.queue_items.clearQueue(queue_id)
    )
    .catch(err => console.log("API Error clearing queue"));
  }
}
/************************************************
API for MediaItemsController
************************************************/

function addGenresTo(rows){
  let seen = {};
  let items = rows.filter(r => {
    console.log('Next row: ', r);
    let prev = {};
    let key = r.media_item_id;

    // Check for null - otherwise adds an empty genre obj w/null id & null name
    if (!key || !r.genre_name){
      return false;
    }
    let gObj = {'genre_id': r.genre_id, 'genre_name': r.genre_name};
    if (seen.hasOwnProperty(key)){
      console.log('Seen this one! ', key);
      prev = seen[key];
      prev.genres.push(gObj);
      return false;
    }
    console.log('New item! ', key);
    seen[key] = r;
    let item = seen[key];
    if (!item.genres) {
      item.genres = [];                              
      item.genres.push(gObj);
      delete item.genre_id;
      delete item.genre_name;
    }
    return true;
  });
  console.log("Single items! ", items);
  return items;
}

module.exports.MediaItemsController = {
  getAllItems : function getAllItems(){
    // return Promise.resolve(dataSources.media_items.getAllItems());
    // https://stackoverflow.com/questions/30025965/merge-duplicate-objects-in-array-of-objects
    return dataSources.media_items.getAllItems()
                      .then(rows => {
                          return addGenresTo(rows);
                      })
                      .catch(err => console.log('Error getting items w/genres', err));
  },
  getMediaTypes : function getMediaTypes(){
    return dataSources.media_items.MEDIA_TYPES;
    //return Promise.resolve(dataSources.getMediaTypes());
  },

  getItemsByType : function getItemsByType(media_type) {
    return dataSources.media_items.getItemsByType(media_type)
                                  .then(rows => {
                                    return addGenresTo(rows);
                                })
                                .catch(err => console.log('Error getting items by type', err));  
  },

  getItemsByGenre : function getItemsByGenre(genre_id) {
    return dataSources.media_items.getItemsByGenre(genre_id)
                      .then(rows => {
                        return addGenresTo(rows);
                    })
                    .catch(err => console.log('Error getting items w/genres', err));                  
  },

  getItemById : function getItemId(id){
    return dataSources.media_items.getItemById(id);
  },
  
  addItem : function addItem(body){
    return dataSources.media_items.addItem(body)
                      .then(res => {
                        console.log("Item added with id: ", res.insertId);
                        let id = res.insertId;
                        return dataSources.item_genres
                                          .setGenresForItem(id, body.genres)
                                          .then(res => {res.insertId = id; return res;}) // set the id to insert id prev returned before adding genres
                                          .catch(err => err)
                      })
                      .catch(err => {throw err});
  },
  
  updateItemWithId : function updateItemWithId(id, body){
    return dataSources.media_items.updateItemWithId(id, body)
                      .then(res => {
                        console.log("Item updated with id: ", id);
                        return dataSources.item_genres
                                          .setGenresForItem(id, body.genres)
                                          .then(res => res)
                                          .catch(err => err)
                      })
                      .catch(err => {throw err});
  },
  
  updateItems : function updateItems(body){
    return dataSources.media_items.updateItems(body);
  },
  
  deleteItemWithId : function deleteItemWithId(id){
    return dataSources.media_items.deleteItemWithId(id);
  }
  
};

/************************************************
API for Genres Controller
************************************************/
module.exports.GenreController = {

  getAllGenres : function getAllGenres(){
    return dataSources.genres.getAllGenres();
  },

  getGenreWithId : function getGenreWithId (body){
    return dataSources.genres.getGenreWithId(body);
  },

  addGenre : function addGenre (body){
    return dataSources.genres.addGenre(body);
  },

  updateGenreWithId : function updateGenreWithId(id, body){
    return dataSources.genres.updateGenreWithId(id, body);
  },

  deleteGenreWithId : function deleteGenreWithId(id){
    return dataSources.genres.deleteGenreWithId(id);
  }
}
  
// module.exports.resetTable = function resetTable(tableName) {
//   return dataSources.resetTable(tableName);
// }