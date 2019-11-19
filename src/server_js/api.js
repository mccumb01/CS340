/********************************************************************************************
 * Author: Mike Cumberworth
 * CS 340 Fall 2019 
 * ******************************************************************************************/

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
                  .catch(err => {console.log(err)
                    return err;
                  });
  },
  authenticateUser : function authenticateUser(body){
  // validate username & password match stored hashes, return T/F.
    return Promise.resolve(dataSources.users.authenticateUser(body))
                  .catch(err => err);
  },

  getAllUsers : function getAllUsers(){
    console.log("getAllUsers called in API");
    return Promise.resolve(dataSources.users.getAllUsers())
          .catch(err => consoler.log(err))
          .then(val=> console.log(val));
  },
                
  getUserById : function getUserById(id){
    console.log("GET USER CALLED IN API.JS! id: ", id);
    return Promise.resolve(dataSources.users.getUserById(id));
  },
  
  updateUser : function updateUser(body){
    return Promise.resolve(dataSources.users.updateUser(body));
  },
                
  deleteUser : function deleteUser(body){
    // authenticateUser(body).then()  
    return Promise.resolve(
        dataSources.users.deleteUser(body)
      );
    }
  }

/************************************************
API for MediaQueue Controller
************************************************/
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

/************************************************
API for MediaItemsController
************************************************/
module.exports.MediaItemsController = {
  getAllItems : function getAllItems(){
    return Promise.resolve(dataSources.media_items.getAllItems());
  },
  getMediaTypes : function getMediaTypes(){
    return dataSources.media_items.MEDIA_TYPES;
    //return Promise.resolve(dataSources.getMediaTypes());
  },

  getItemById : function getItemId(id){
    return dataSources.media_items.getItemById(id);
  },
  
  addItem : function addItem(body){
    return dataSources.media_items.addItem(body);
  },
  
  updateItemWithId : function updateItemWithId(id, body){
    return dataSources.media_items.updateItemWithId(id, body);
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
  
module.exports.resetTable = function resetTable(tableName) {
  return dataSources.resetTable(tableName);
}