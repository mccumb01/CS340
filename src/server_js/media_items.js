/********************************************************************************************
 * Author: Mike Cumberworth
 * CS 340, Section 400 Databases Fall 2019 
 *******************************************************************************************/

module.exports = function() {

  const express = require('express');
  const router = express.Router();
  const api = require('./api');

  router.get('/', function (req, res) {
    if(!req.session.user || !req.session.user.username){
      res.redirect('/login');
      return;
    }
    let context = {};
    let types = api.MediaItemsController.getMediaTypes();
    console.log("Media types: ", types);
    context.types = types;
    api.GenreController.getAllGenres().then(g => {
      context.genres = g;
      res.render('media_items', context);
    });
    return; 
  });

  router.get('/all_items', function (req, res) {
    api.MediaItemsController.getAllItems().then(g => {
      res.json(g);
    })
    .catch((err)=> console.log("Err retrieving media_items." , err));
    return; 
  });

  router.get('/all_items/genre/:genre_id', function (req, res) {
    console.log('Getting by genre id?', req.params.genre_id);
    api.MediaItemsController.getItemsByGenre(req.params.genre_id).then(g => {
      res.json(g);
    })
    .catch((err)=> console.log("Err retrieving media_items." , err));
    return; 
  });
  
  router.get('/all_items/type/:media_type', function (req, res) {
    let type = req.params.media_type;
    console.log('Trying to get media by type: ', type);
    api.MediaItemsController.getItemsByType(type).then(g => {
      res.json(g);
    })
    .catch((err)=> console.log("Err retrieving media_items." , err));
    return; 
  });

  router.get('/genres', function (req, res) {
    let context = {};
    api.GenreController.getAllGenres().then(g => {
      context.genres = g;
      console.log("Context for media items: \n",context); 
      res.render('media_items', context);
    })
    .catch(err => {throw err});
  });

  router.post('/', function(req, res){
    console.log('ADD ITEM POST HIT', req.body);
    let context = {};
    api.MediaItemsController.addItem(req.body).then(val =>{
      console.log('Item Added? ', val);
      res.json(val);
    })
    .catch(err => {throw err});
  });

  router.put('/', function(req, res){
    console.log('EDIT ITEM POST HIT', req.body.media_item_id);
    let id = req.body.media_item_id;
    api.MediaItemsController.updateItemWithId(id, req.body).then(val =>{
      console.log('Item Updated? ', val);
      res.json(val);
    })
    .catch(err => {throw err});
  });

  router.delete('/', function(req, res){
    console.log('DELETE ITEM HIT', req.body);
    let id = req.body.id;
    api.MediaItemsController.deleteItemWithId(id, req.body).then(val =>{
      console.log('Item Deleted? ', val);
      res.json(val);
    })
    .catch(err => {throw err});
  });

  return router;
}();