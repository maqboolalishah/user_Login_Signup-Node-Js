const mysql = require("mysql2");
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "sajidFyp",
 
});
module.exports = pool.promise();
