module.exports = function() {

  const express = require('express');
  const router = express.Router();
  const api = require('./api');

  router.get('/', function (req, res) {
    let priorities = api.MediaQueueController.getPriorityItems();
    console.log("PRIORITIES: ", priorities);
    let context = {priorities}; 
    if(!req.session || !req.session.username){
      res.render('login', context);
      return;
    }
    context.user_id = req.session.user_id;
    context.username = req.session.username;
    context.user_email = req.session.user_email;
    res.render('profile', context);
    return;
  });

  router.route('../user-info')
        .get((req, res) => {
        console.log("user 'GET' route!");
        let id = req.query.id;
        if (id != null && id != undefined) {
          api.UserController.getUserById(id).then(val => {
            res.json(val);
          });
        }
        else {
          console.log("No user w/id ", id);
        }
      })
      .post((req, res, next) => {
      // console.log('POST req received');
        if(req.body['New Session'] || req.body['New User']){
          console.log("New Session?");
          req.session.username = req.body.username;
          req.session.user_email = req.body.user_email;
        }
        // If there is no session, go to the login page.
        if(!req.session || !req.session.username){
          res.render('login', {});
          return;
        }
        api.UserController.createUser(req.body).then(val => {
          req.body.user_id = val.insertId;
          req.session.user_id = val.insertId;
          console.log("Req.body from post now with id:", req.body);
          let context = req.body;
          context.priorities = [];
          res.render('profile', context);
        });
        
        return;
      })
      .put((req, res) => { 
        // console.log('PUT req received');
        // If there is no session, go to the login page.
        if(!req.session || !req.session.username){
          res.render('login', {});
          return;
        } 
        let id = req.query.id;
        req.session.username = req.body.username;
        req.session.user_email = req.body.user_email;
        api.UserController.updateUser(req.body).then(val => res.json(val));
      })
      .delete((req, res) => {
      // console.log('DELETE req received');
        let id = parseInt(req.query.id);
        api.deleteUser(req.body).then(() => res.send(`Entry ${id} deleted`))
      });

  return router;
}();