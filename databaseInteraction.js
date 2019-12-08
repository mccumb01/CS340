/******************************************************************************************
 * Author: Sriram Narayanan & Mike Cumberworth
 * CS 340, Fall 2019 
 ******************************************************************************************/

const bodyParser = require('body-parser');
const db = require('mysql');
const express = require('express');
let session = require('express-session');

const path = require('path');

const app = express();
const publicDirPath = path.join(__dirname, '/public');

app.use(session({secret:'ReadAllTheThings', path: "/", saveUninitialized: true, resave: true }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(publicDirPath));
app.use(require('./src/server_js/routes.js')); 
app.locals.loggedIn = false;
const hb = require('express-handlebars').create({
  defaultLayout : 'main',
  helpers: {
    year: function() {
      return new Date().getFullYear();
    },
    loggedIn :function() {
      console.log('Logged in helper called!\n', app.locals);
      return app.locals.loggedIn;
    }  
  }
});
app.engine('handlebars', hb.engine);

app.set('view engine', 'handlebars');
//app.set('port', process.env.CS340_MYSQL_PORT);
app.set('port', 3000);

/*app.listen(app.get('port'), () => {
  console.log('Express started on ' + process.env.CS340_MYSQL_HOST + ":" + process.env.CS340_MYSQL_PORT); // http://flip3.engr.oregonstate.edu:60075/
});*/

app.listen(app.get('port'), () => {
  console.log('Express started on ' + app.get('port') + ":" + process.env.CS340_MYSQL_PORT); // http://flip3.engr.oregonstate.edu:60075/
});