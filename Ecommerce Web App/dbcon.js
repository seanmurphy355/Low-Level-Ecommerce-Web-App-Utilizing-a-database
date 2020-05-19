var mysql = require('mysql');
var pool = mysql.createPool({
host            : 'classmysql.engr.oregonstate.edu',
user            : 'cs340_serratab',
password        : '2647',
database        : 'cs340_serratab'
});
module.exports.pool = pool;