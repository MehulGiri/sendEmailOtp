var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'at_cart_app'
  });
  connection.connect(function (err) {
    if (err) {
      console.log("Error While Mysql Coonect")
    }
    else {
      console.log("Connect this :")
    }
  });
module.exports = connection;