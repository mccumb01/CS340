/******************************************************************************************
 * Author: Mike Cumberworth
 * CS 290, Section 400 Web Development Summer 2019 
 * 
 * Assignment Database Interaction:
 * ***************************************************************************************/

const express = require('express');
const router = express.Router();
const api = require('./api');

/*********************************************
 * Page Route Endpoints
 *********************************************/
router.get('/', function (req, res) {
  // if(!req.session.name){
  //   res.render('login', context);
  //   return;
  // }
  res.render('home');
  return;
});

// router.get('/media_items', function (req, res) {
//   res.render('media_items');
//   return;
// });

router.get('/user', function (req, res) {
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

// Route to login an existing user
router.route('/login')
  .get((req, res) => {
    if(req.body['New Session'] || req.body['New User']){
      console.log("New Session?");
      req.session.username = req.body.username;
      req.session.user_email = req.body.user_email;
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

  router.get('/about', function (req, res) {
    res.render('about');
    return;
  });


/*********************************************
 * User CRUD Web API Endpoints
 *********************************************/
router.route('/user-info')
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

/*********************************************
 * Media Items Page 
 *********************************************/
router.get('/media_items', function (req, res) {
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
/*********************************************
 * Media Items CRUD Web API Endpoints
 *********************************************/

/*********************************************
 * Genres CRUD Web API Endpoints
 *********************************************/

router.post('/add_genre', function (req, res) {
  console.log('add_genre route called in API!', req.body);
  api.GenreController.addGenre(req.body)
                     .then(val => res.json(val));
});

/*********************************************
 * Media Queue CRUD Web API Endpoints
 *********************************************/

router.route('/mediaqueue')

  .get((req, res) => {
  let entries = [];
  let id = req.query.id;
  if (id != null && id != undefined) {
    api.getEntryById(id).then(val => {
      res.json(val);
    });
  }
  else {
    api.getEntries().then(val => {
     // console.log("Val: ", val);
      res.json(val);
    });   
  }
})
.post((req, res) => {
 // console.log('POST req received');
  api.addWorkout(req.body).then(val => {
    res.json(val);
  });
  return;
})
.put((req, res) => {
 // console.log('PUT req received');
  let id = req.query.id;
  api.updateEntryWithId(id, req.body).then(val => res.json(val));
})
.delete((req, res) => {
 // console.log('DELETE req received');
  let id = parseInt(req.query.id);
  api.deleteEntryWithId(id).then(()=> res.send(`Entry ${id} deleted`));
});



// Used to drop & rebuild an empty workouts table in the database
router.get('/reset-table',function(req,res,next){
  let tableName = req.query.tableName || "";
  let context = {};
  api.resetTable(tableName).then(() => res.send('<h1>Table Reset</h1>')); 
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