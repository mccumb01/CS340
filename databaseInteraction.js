/******************************************************************************************
 * Author: Mike Cumberworth
 * CS 340, Fall 2019 
 ******************************************************************************************/

const bodyParser = require('body-parser');
const db = require('mysql');
const express = require('express');
let session = require('express-session');
const hb = require('express-handlebars').create({defaultLayout : 'main'});
const path = require('path');

const app = express();
const publicDirPath = path.join(__dirname, '/public');

app.use(session({secret:'ReadAllTheThings', path: "/", saveUninitialized: true, resave: true }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(publicDirPath));
app.use(require('./routes.js')); 

app.engine('handlebars', hb.engine);

app.set('view engine', 'handlebars');
app.set('port', process.env.CS340_MYSQL_PORT);

app.listen(app.get('port'), () => {
  console.log('Express started on ' + process.env.CS340_MYSQL_HOST + ":" + process.env.CS340_MYSQL_PORT); // http://flip3.engr.oregonstate.edu:60302/
});