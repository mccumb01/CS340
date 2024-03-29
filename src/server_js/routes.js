/******************************************************************************************
 * Author: Mike Cumberworth
 * CS 340, Section 400 Web Development Fall 2019 
 * 
 * This page brings together all page and API routes actually called by clients.

 * These functions all call the appropriate "Controller" in api.js.
 * That file is an abstraction layer between endpoints and the database.
 * The goal of this separation was to use TDD and the abstractions to facilitate testing & development 
 * of the front-end and routing independent of the actual database. 

 * Some routes been split to separate files, while others are still in this file.
 *  - genres, media_queue, and queue_items are all still here. 
 *  - media_items.js handles all routes and endpoints for the media_items page 
 *  - login.js handles login functionality (Creates new users) on the "Login" page
 *  - users.js handles routes and endpoints for RUD'ing user info on the "Profile" page
 * 
 ****************************************************************************************/

const express = require('express');
const router = express.Router();
const api = require('./api');

/*********************************************
 * Home Page
 *********************************************/
router.get('/', function (req, res) {
  console.log('User: ',req.session.user, "loggedIn? : ", req.app.locals.loggedIn);
  if(!req.app.locals.loggedIn || !req.session.user || !req.session.user.username){
    
    res.redirect('./login');
    return;
  }
  res.render('home');
  return;
});

/*********************************************
 * Media Items Page 
 *********************************************/
router.use('/media_items', require('./media_items.js'));

/*********************************************
 * Media Queue
 *********************************************/
//router.use('/queue_item', require('./queue_items.js'));
/*********************************************
 * Profile Page
 *********************************************/

router.get('/user', function (req, res) {
  if(!req.session.user || !req.session.user.username){
    res.redirect('./login');
    return;
  }

  let priorities = api.MediaQueueController.getPriorityItems();
  console.log("PRIORITIES: ", priorities);
  let context = {priorities}; 
  context.user = req.session.user;
  res.render('profile', context);
});

router.use('/user-info', require('./users.js'));

/************************************************
Login Existing User
************************************************/
router.route('/login')
  .get((req, res) => {
    if (req.app.locals.loggedIn){
      req.app.locals.loggedIn = false;
    }
    if(req.body['New Session'] || req.body['New User']){
      console.log("New Session?");
      req.app.locals.loggedIn = true;
      req.session.user = {user_id: -1, username: req.body.username, user_email: req.body.user_email };
    } 
    res.render('login');
    return;    
  })
  .post((req, res, next) =>{
      let context = {};
      api.UserController.authenticateUser(req.body)
          .then(user => {
            if (!user) {
              res.status(400);
              return;
            }
            req.session.user = user;
            req.app.locals.loggedIn = true;
            res.redirect('/user');
          })
          .catch(err =>{
            console.log("Error w/user auth in route", err);
            res.status(401).render('401', {name: req.body.username});
          })
      return;
  });

/*********************************************
* About Page
*********************************************/
  router.get('/about', function (req, res) {
    res.render('about');
    return;
  });


/*********************************************
 * Genres CRUD Web API Endpoints
 *********************************************/

router.post('/add_genre', function (req, res) {
  console.log('add_genre route called in API!', req.body);
  api.GenreController.addGenre(req.body)
                     .then(val => {return api.GenreController.getAllGenres();})
                     .then(genres => res.render('media_items', {genres: genres}))
                     .catch(err => res.json(null));
});

/*********************************************
 * Media Queue CRUD Web API Endpoints
 *********************************************/

router.route('/media_queue/:user_id?/:queue_id?')

  .get((req, res) => {
  let id = req.query.id;
  if (id != null && id != undefined) {
    api.MediaQueueController.getQueueById(id).then(val => {
      res.json(val);
    });
  }
  else {
      res.json(null);   
  }
})
.post((req, res) => {
 // console.log('POST req received');
  api.MediaQueueController.createNewQueue(req.user_id).then(val => {
    res.json(val);
  });
  return;
})
.delete((req, res) => {
 // console.log('DELETE req received');
  let id = parseInt(req.query.id);
  api.MediaQueueController.deleteMediaQueueWithId(id).then(()=> res.send(`Queue with ${id} deleted`));
});

/*********************************************
 * Queue Item CRUD Web API Endpoints
 *********************************************/
router.route('/queue_items')
      .get((req, res) => {
          if (!id){
            id = 1;
          }
          api.QueueItemsController.getItemsForQueue(id).then(val => {
            res.json(val);
          });
      })
      .post((req, res) => {
      // console.log('POST req received');
        let item = req.body;
        if (!item){
          res.statusCode(400).send('No form body.');
        }
        api.QueueItemsController.addQueueItem(item).then(val => {
          res.json(val);
        });
        return;
      })
      .put((req, res) => {
        // console.log('POST req received');
          let item = req.body;
          if (!item){
            res.statusCode(400).send('No form body.');
          }
          api.QueueItemsController.updateQueueItem(item).then(val => {
            res.json(val);
          });
          return;
        })
      .delete((req, res) => {
      // console.log('DELETE req received');
      let item_id = req.body.media_item_id;
      let q_id = req.body.media_queue_id;
        api.QueueItemsController.removeQueueItem(item_id, q_id).then(()=> res.send(`Queue item with ${id} deleted`));
      });
  router.delete('/clear_queue/:queue_id',(req, res) => {
    api.QueueItemsController.clearQueue(queue_id)
                            .then(() => res.send({}))
                            .catch((err) => console.log("Error clearing queue ", err));
  });

router.use((req, res, next) => {
  res.status(404);
  res.render('404');
  return;
});

router.use((err, req, res, next) =>{ 
  console.error(err.stack);
  res.status(500);
  res.render('500');
  next();
});

module.exports = router;