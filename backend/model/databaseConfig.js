// Name : Quek Wei Lin
// Admin  : P1909618
// Class DIT?FT/1B/39
const mysql = require("mysql");
module.exports = {
  getConnection: function () {
      var conn = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'password', //your own password
      database: 'sp_movie',
      dateStrings: true
    });
    return conn;
  }
};
