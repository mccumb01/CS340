module.exports = function() {

  const express = require('express');
  const router = express.Router();
  const api = require('./api');

  router.route('/')
    .get((req, res) => {
      if(req.body['New Session'] || req.body['New User']){
        console.log("New Session?");
        req.session.user.username = req.body.username;
        req.session.user.user_email = req.body.user_email;
      } 
      res.render('login');
      return;    
    })
    .post((req, res) =>{
        let context = {};
        let priorities = api.MediaQueueController.getPriorityItems();
        console.log("PRIORITIES: ", priorities);
        context = {priorities}; 
        api.UserController.authenticateUser(req.body)
            .then(user => {
              if (!user) {
                res.status(400);
                return;
              }
              console.log("User after auth?", user);
              context.user_id = user.user_id;
              context.username = user.username;
              context.user_email = user.user_email;
              //context.userpw = req.body.pw //no, this isn't how it would actually work in production. Use auth middleware.
              req.session.user_id = user.user_id;
              req.session.username = user.username;
              req.session.user_email = user.user_email;
              console.log('Req Session after login: ', req.session);
              res.render('profile', context);
            })
            .catch(err =>{
              res.status(404);
            });
        return;
    });
    return router;
  }();