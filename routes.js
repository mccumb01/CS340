/******************************************************************************************
 * Author: Mike Cumberworth
 * CS 290, Section 400 Web Development Summer 2019 
 * 
 * Assignment Database Interaction:
 * ***************************************************************************************/

const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/', function (req, res) {
  // if(!req.session.name){
  //   res.render('login', context);
  //   return;
  // }
  res.render('home');
  return;
});

router.get('/add-item', function (req, res) {
  res.render('home');
  return;
});

router.get('/user', function (req, res) {
  let priorities = api.getPriorities();
  console.log("PRIORITIES: ", priorities);
  let context = {priorities}; 
  res.render('profile', context);
  return;
});

router.route('/login')
  .get((req, res) => {
      // logout
      res.render('login');
      return;    
  })
  .post((req, res) =>{
      // handle login somehow & redirect to 'home' if successful
      res.render('home');
      return;
  });

// API endpoints actually called by the client's Ajax requests
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
  var context = {};
  api.resetTable().then(() => res.send('<h1>Table Reset</h1>')); 
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