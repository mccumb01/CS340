/********************************************************************************************
 * Author: Mike Cumberworth
 * CS 290, Section 400 Web Development Summer 2019 
 * 
 * Assignment Database Interaction:
 * Pass-through Interface to separate API calls from data-layer implementation
 * ******************************************************************************************/
const dataSources = require ('./dataSources');

module.exports.getEntries = function getEntries(){
  return Promise.resolve(dataSources.getEntries());
}

module.exports.getEntryById = function getEntryById(id){
  return dataSources.getEntryById(id);
}

module.exports.addItem = function addItem(body){
  return dataSources.createEntry(body);
}

module.exports.getPriorities = function getPriorities(){
  return [{"title" : "Book1", "mediaType" : "book", "originalTitle" : "El Libro Numero Uno", "priority" : true}];
  // return dataSources.getPriorities();
}

module.exports.updateEntryWithId = function updateEntryWithId(id, body){
  return dataSources.updateEntryWithId(id, body);
}

module.exports.deleteEntryWithId = function deleteEntryWithId(id){
  return dataSources.deleteEntryWithId(id);
}

module.exports.resetTable = function resetTable() {
  return dataSources.resetTable();
}