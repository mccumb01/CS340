/******************************************************************************************
 * Author: Mike Cumberworth
 * CS 340, Fall 2019 
 ******************************************************************************************/

const bodyParser = require('body-parser');
const db = require('mysql');
const express = require('express');
const hb = require('express-handlebars').create({defaultLayout : 'main'});
const path = require('path');
// let session = require('express-session');

const app = express();
const publicDirPath = path.join(__dirname, '/public');

// app.use(session({secret:'MathIsFunTheySaid', path: "/form"}));
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