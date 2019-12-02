/********************************************************************************************
 * Author: Sriram Narayanan
 * CS 340 Fall 2019 
 * ******************************************************************************************/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
/*
var pool = mysql.createPool({
    connectionLimit : 10,
    host  : 'classmysql.engr.oregonstate.edu',
    user  : 'cs290_naraysri',
    password: ,
    database: 
});*/

var pool = mysql.createPool({
    connectionLimit : 10,
    host  : 'localhost',
    user  : 'root',
    password: 'password',
    database: 'cs340_naraysri'
});
app.set('port', 3001);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
/*
app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS media_item_id", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE media_item("+
    "media_item_id INT PRIMARY KEY AUTO_INCREMENT,"+
    "queue_item_id INT,"+
    "media_type VARCHAR(255) NOT NULL,"+
    "title VARCHAR(255) NOT NULL,"+
    "original_language_title VARCHAR(255) NOT NULL,"+
    "publication_year INT"+
    "user_rating INT"+
    "date_Added DATE)";
    pool.query(createString, function(err){
      res.render('home',context);
    })
  });
});

*/
// Home page
app.get('/', function(req,res){
  var context = {};
  res.render('home', context);
});
/*
// Gets database data
app.get('/get-data', function(req,res,next){
  sendTablePayload(req,res,next);
});

// Gets data from client to add a new completed exercise
app.post('/add', function(req,res,next){
  pool.query("INSERT INTO media_item (`name`, `date`,`reps`,`weight`,`lbs`) VALUES (?,?,?,?,?)", [req.body.name,req.body.date,req.body.reps,req.body.weight,req.body.unit], function(err, result){
    if(err){
      next(err);
      return;
    }
    sendTablePayload(req,res,next);
  });
});


app.post('/delete', function(req, res, next){
  pool.query("DELETE FROM media_item WHERE id = ?", [req.body.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    sendTablePayload(req,res,next);
  });
});

// Selects data in  database and sends to client
function sendTablePayload(req,res, next){
  pool.query('SELECT * FROM media_item ORDER BY name', function(err, rows, fields){
  if(err){
    next(err);
    return;
  }
  res.type('application/json');
  res.send(rows);
  });

}

// Updates existing data in the database with the new data from client
app.post('/update',function(req,res,next){
  pool.query("UPDATE media_item SET name=?, date=?, reps=?, weight=?, lbs=? WHERE id = ?", [req.body.name, req.body.date, req.body.reps, req.body.weight, req.body.unit, req.body.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    sendTablePayload(req,res,next);
  });
});*/

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
