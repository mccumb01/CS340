/********************************************************************************************
 * Author: Mike Cumberworth
 * CS 290, Section 400 Web Development Summer 2019 
 * 
 * Assignment Database Interaction:
 * Pass-through Interface to separate API calls from data-layer implementation
 * Maybe split these up to follow more of an MVC approach; items, genres, users, other middleware, etc.
 * ******************************************************************************************/
const dataSources = require ('./dataSources');

module.exports.UserController = {
  createUser : function createUser(body){
    return dataSources.createUser(body);
  },
  authenticateUser : function authenticateUser(body){
  // validate username & password match stored hashes, return T/F.
  return false;
  },
                
  getUserInfo : function getUserInfo(body){
    return Promise.resolve(dataSources.getUserInfo(body));
  },
                
  deleteUserAfterAuth : function deleteUserAfterAuth(body){
      return Promise.resolve(
        dataSources.deleteUserAfterAuth(body)
      );
    }
  }

module.exports.MediaQueueController = {
  createNewQueue : function() {
    // create a new media queue;
  },
  addQueueItem : function(item, queueId){
    // add an item to to queue with the given id 
  },
  updateQueueItem : function(item, queueId){
    // update a given item in a given queue - could be updates to title, author, status, or priority
  },
  removeQueueItem : function(item, queueId){
    // removes an item from a queue; does not remove the item from the database.
  },
  deleteMediaQueueWithId : function(queueId){
    // delete the given queue from the database.
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

module.exports.MediaItemsController = {
  getAllItems : function getAllItems(){
    return Promise.resolve(dataSources.getAllItems());
  },
  
  getItemById : function getItemId(id){
    return dataSources.getItemById(id);
  },
  
  addItem : function addItem(body){
    return dataSources.addItem(body);
  },
  
  updateItemWithId : function updateItemWithId(id, body){
    return dataSources.updateItemWithId(id, body);
  },
  
  updateItems : function updateItems(body){
    return dataSources.updateItems(body);
  },
  
  deleteItemWithId : function deleteItemWithId(id){
    return dataSources.deleteItemWithId(id);
  }
  
};

module.exports.GenreController = {

  getAllGenres : function getAllGenres(){
    return Promise.resolve(dataSources.getAllGenres(body));
  },

  getGenreWithId : function getGenreWithId (body){
    return Promise.resolve(dataSources.getGenreWithId(body));
  },

  addGenre : function addGenre (body){
    return dataSources.addGenre(body);
  },

  updateGenreWithId : function updateGenreWithId(id, body){
    return dataSources.updateGenreWithId(id, body);
  },

  deleteGenreWithId : function deleteGenreWithId(id){
    return dataSources.deleteGenreWithId(id);
  }
}
  
module.exports.resetTable = function resetTable() {
  return dataSources.resetTable();
}