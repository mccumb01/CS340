module.exports = function() {

  const express = require('express');
  const router = express.Router();
  const api = require('./api');

  /*********************************************
 * User CRUD Web API Endpoints
 *********************************************/
router.route('/') //actually /user-info
  .get((req, res) => {
    console.log("user-info 'GET' route!");
    let id = req.query.id;
    if (id != null && id != undefined) {
      api.UserController.getUserById(id).then(val => {
        res.json(val);
        return;
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
      req.app.locals.loggedIn = true;
      req.session.user = {};
      req.session.user.username = req.body.username;
      req.session.user.user_email = req.body.user_email;
    }
    // If there is no session, go to the login page.
    if(!req.session.user.username){
      res.redirect('../login');
      return;
    }
    api.UserController.createUser(req.body).then(val => {
      req.body.user_id = val.insertId;
      req.session.user.user_id = val.insertId;
      req.app.locals.loggedIn = true;
      let context = req.body;
      context.priorities = [];
      res.render('profile', context);
    })
    .catch((err) => res.status(400).json(err));
  })
  .put((req, res) => { 
    api.UserController.updateUser(req.body)
                      .then(val => res.json(val))
                      .catch(err => console.log(err));
  })
  .delete((req, res) => {
    // console.log('DELETE req received');
    let id = parseInt(req.body.user_id);
    console.log(id, typeof id);
    if (!id || (typeof id) != 'number' ) {
      console.log("Bad User ID")
      res.status(400).send(null);
      return;    
    }
    let user = api.UserController.getUserById(id)
    .then(val => {
      if (val.user_id != null){
        console.log("User exists with id ", val.user_id);
        return api.UserController.deleteUser(id);
      }
      else {
        console.log("No User w/that Id");
        res.status(404).send("User does not exist");
        return;
      }
    }) 
    .then(() => {
      console.log("User deleted!");
      req.session.user.username = null;
      req.session.user.user_email = null;
      res.status(200).send('User deleted!');
    })
    .catch(err => console.log(err));
  });

  return router;
}();