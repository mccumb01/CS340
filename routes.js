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

router.get('/media_items', function (req, res) {
  res.render('media_items');
  return;
});

router.get('/user', function (req, res) {
  let priorities = api.MediaQueueController.getPriorityItems();
  console.log("PRIORITIES: ", priorities);
  let context = {priorities}; 
  res.render('profile', context);
  return;
});

// Route to login an existing user
router.route('/login')
  .get((req, res) => {

      res.render('login');
      return;    
  })
  .post((req, res) =>{
      let context = {};
      context.username = req.body.username;
      context.userpw = req.body.pw //no, this isn't how it would actually work in production. Use auth middleware.
      res.render('home', context);
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
  api.UserController.createUser(req.body).then(val => {
    console.log("User from route: ", val);
    res.render('home');
  });
  return;
})
.put((req, res) => {
 // console.log('PUT req received');
  let id = req.query.id;
  api.updateUser(id, req.body).then(val => res.json(val));
})
.delete((req, res) => {
 // console.log('DELETE req received');
  let id = parseInt(req.query.id);
  api.deleteUser(req.body).then(()=> res.send(`Entry ${id} deleted`))
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