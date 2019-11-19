/********************************************************************************************
 * Author: Mike Cumberworth
 * CS 340, Section 400 Web Development Summer 2019 
 *******************************************************************************************/

const mysql = require ('mysql');


/************************************************
Shared Database Connection Pool for All Entities
************************************************/
let pool = mysql.createPool({
  host  : process.env.CS340_MYSQL_HOST, //+ ":" + process.env.CS340_MYSQL_PORT,
  user  : process.env.CS340_MYSQL_USER,
  password: process.env.CS340_MYSQL_PW,
  database: process.env.CS340_MYSQL_DB,
  connectionLimit: 100
});

module.exports = pool;

/*******************************************
SQL Tables & Database Maintenance
*******************************************/

module.exports.resetTable = function resetTable(tableName) {
  return Promise.resolve(pool.query(`DELETE FROM ${tableName}`, 
  (err) =>{ console.log("Error emptying table") }));
}

module.exports.nukeDB = function nukeDB(){

  const replaceNewlines = /;|\n*/g;
  const initialSQL = fs.readFileSync(path.join(__dirname, '/initial_sql.txt'), {encoding: 'UTF-8'}).split(';\n');
  for (let query of initialSQL) {
    query.replace(replaceNewlines,'');
    query = query.trim();
    console.log('Query: ' + query + ';');
    pool.query(query, 
      (err) => console.log("Error resetting database", err ));
  }
}