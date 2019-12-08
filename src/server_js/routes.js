/******************************************************************************************
 * Author: Mike Cumberworth
 * CS 340, Section 400 Web Development Fall 2019 
 ****************************************************************************************/

const express = require('express');
const router = express.Router();
const api = require('./api');

/*********************************************
 * Home Page
 *********************************************/
router.get('/', function (req, res) {
  if(!req.session.user || !req.session.user.username){
    res.redirect('/login');
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
router.use('/queue_item', require('./queue_items.js'));
/*********************************************
 * Profile Page
 *********************************************/

router.get('/user', function (req, res) {
  if(!req.session.user || !req.session.user.username){
    res.redirect('/login');
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
    if(req.body['New Session'] || req.body['New User']){
      console.log("New Session?");
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


// /*********************************************
//  * User CRUD Web API Endpoints
//  *********************************************/
// router.route('/user-info')
//   .get((req, res) => {
//   console.log("user 'GET' route!");
//   let id = req.query.id;
//   if (id != null && id != undefined) {
//     api.UserController.getUserById(id).then(val => {
//       res.json(val);
//       return;
//     });
//   }
//   else {
//     console.log("No user w/id ", id);
//   }
// })
// .post((req, res, next) => {
//  // console.log('POST req received');
//   if(req.body['New Session'] || req.body['New User']){
//     console.log("New Session?");
//     req.session.username = req.body.username;
//     req.session.user_email = req.body.user_email;
//   }
//   // If there is no session, go to the login page.
//   if(!req.session.username){
//     res.redirect('/login');
//     return;
//   }
//   api.UserController.createUser(req.body).then(val => {
//     req.body.user_id = val.insertId;
//     req.session.user_id = val.insertId;
//     console.log("Req.body from post now with id:", req.body);
//     let context = req.body;
//     context.priorities = [];
//     res.render('profile', context);
//   });
// })
// .put((req, res) => { 
//   api.UserController.updateUser(req.body)
//                     .then(val => res.json(val))
//                     .catch(err => console.log(err));
// })
// .delete((req, res) => {
//  // console.log('DELETE req received');
//   let id = parseInt(req.body.user_id);
//   console.log(id, typeof id);
//   if (!id || (typeof id) != 'number' ) {
//     console.log("Bad User ID")
//     res.status(400).send(null);
//     return;    
//   }
//   let user = api.UserController.getUserById(id)
//   .then(val => {
//     if (val.user_id != null){
//       console.log("User exists with id ", val.user_id);
//       return api.UserController.deleteUser(id);
//     }
//     else {
//       console.log("No User w/that Id");
//       res.status(404).send("User does not exist");
//       return;
//     }
//   }) 
//   .then(() => {
//     console.log("User deleted!");
//     req.session.username = null;
//     req.session.user_email = null;
//     res.status(200).send('User deleted!');
// })
//   .catch(err => console.log(err));
// });

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