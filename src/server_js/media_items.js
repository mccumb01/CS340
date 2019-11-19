module.exports = function() {

  const express = require('express');
  const router = express.Router();
  const api = require('./api');

  router.get('/', function (req, res) {
    let context = {};
    let types = api.MediaItemsController.getMediaTypes();
    console.log('media types: ' , types);
    context.types = types;
    api.GenreController.getAllGenres().then(g => {
      context.genres = g;
      console.log("Context for media items: \n",context); 
      res.render('media_items', context);
    });
    return; 
  });

  router.post('/', function(req, res){
    console.log('ADD ITEM POST HIT', req.body);
    let context = {};
    api.MediaItemsController.addItem(req.body).then(val =>{
      console.log('Item Added? ', val);
      res.json(val);
    });
    return; 
  });

  return router;
}();