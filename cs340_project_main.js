/********************************************************************************************
 * Author: Mike Cumberworth
 * CS 340, Section 400 Databases Fall 2019 
 * 
 * This is the main Express server-side app, run with Node.
 * Imports npm modules used by the app
 * Imports "routes.js", which holds all the endpoints for clients to hit
 * 
 * Files under 'src/server' are server-side Express files
 *  - routes.js brings together all the endpoints and routes 
 *  - api.js is an API abstraction layer that performs some middleware functions, and data models
 
 * Files under 'src/data_layer' are for the database connection, and for making actual DB queries 
 * 
 * Files under 'public' are static client-side JS, CSS, and image assets
 * 
 *******************************************************************************************/

const bodyParser = require('body-parser');
const express = require('express');
let session = require('express-session');
const path = require('path');

const app = express();
const publicDirPath = path.join(__dirname, '/public');

app.locals.loggedIn = false;

app.use(session({secret:'ReadAllTheThings', path: "/", saveUninitialized: true, resave: true }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(publicDirPath));
app.use(require('./src/server_js/routes.js')); 

const hb = require('express-handlebars').create({
  defaultLayout : 'main',
  helpers: {
    year: function() {
      return new Date().getFullYear();
    },
    loggedIn :function() {
      console.log('Logged in helper called!\n', app.locals.loggedIn);
      return app.locals.loggedIn;
    }  
  }
});
app.engine('handlebars', hb.engine);

app.set('view engine', 'handlebars');
app.set('port', process.env.CS340_MYSQL_PORT);

app.listen(app.get('port'), () => {
  console.log('Express started on ' + process.env.CS340_MYSQL_HOST + ":" + process.env.CS340_MYSQL_PORT); // http://flip3.engr.oregonstate.edu:60075/
});