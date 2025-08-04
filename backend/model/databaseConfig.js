// Name : Quek Wei Lin
// Admin  : P1909618
// Class DIT?FT/1B/39
const mysql = require("mysql2");
require("dotenv").config();
module.exports = {
  getConnection: function () {
      var conn = mysql.createConnection({
      host: process.env.DB_HOST,
      port: 3306,
      user: 'root',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      dateStrings: true
    });
    return conn;
  }
};
