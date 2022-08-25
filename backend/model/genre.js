// Name : Quek Wei Lin
// Admin  : P1909618
// Class DIT/FT/1B/39

const db = require("./databaseConfig");

module.exports = {

    //Endpoint 5
    //genre.insert(user, callback)
    insert: function(genre, callback) {
        var dbConn =  db.getConnection();
        dbConn.connect(function (err)  {
            if(err) {
                console.log("In genre.js insert ConnError: ", err);
                return callback(err, null);
            } else {
                const insertUserQuery =
                `
                INSERT INTO genre (genre, description)
                VALUES (?, ?);
                `;
                dbConn.query(
                  insertUserQuery,
                  [genre.genre, genre.description],
                  (error, results) => {
                  dbConn.end();
                  if (error) {
                    return callback(error, null);  
                  } else {
                        return callback(null, results.insertId);
                  }
                });
        
            }
        });
    
    },
    

    //Endpoint 6
    // genre.findAll(callback)
    findAll: function(callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("In genre.js findAll ConnError:", err);
                return callback(err, null);
            } else {
                const findAllUsersQuery = "SELECT * FROM genre;";
                dbConn.query(findAllUsersQuery, (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log("In genre.js findAll QueryError:", err);
                        return callback(error, null);
                    } else if (!error && results.length == 0) {
                        // console.log("In genre.js findAll Results:",results);
                        return callback(null, null);
                    } else {
                        // console.log("In genre.js findByID Results:",results);
                        return callback(null, results);
                    }
                });
            }
        });
    },    



}