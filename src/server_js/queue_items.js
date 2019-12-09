module.exports = function() {

  const express = require('express');
  const router = express.Router();
  const api = require('./api');

  router.get('/', function (req, res) {
    let context = {};
      alert('queue_items.js / hit')
      res.render('queue_item');
    return; 
  });
  return router;
}();