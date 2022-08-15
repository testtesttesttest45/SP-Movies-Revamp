// Name : Quek Wei Lin
// Admin  : P1909618
// Class DIT/FT/1B/39

const db = require("./databaseConfig");

module.exports = {

    //Endpoint 7
    //movie.insert(user, callback)
    insert: function(movie, callback) {
        var dbConn =  db.getConnection();
        dbConn.connect(function (err)  {
            if(err) {
                console.log("In movie.js insert ConnError: ", err);
                return callback(err, null);
            } else {
                //  INSERT INTO movie (title, description, cast, genreid, genreid1, time, opening_date)
                const insertUserQuery =
                `
                INSERT INTO movie (title, description, cast, genreid, time, opening_date)
                VALUES (?, ?, ?, ?, ?, ?);
                `;
                dbConn.query(
                  insertUserQuery,
                  [movie.title, movie.description, movie.cast,  movie.genreid, movie.time, movie.opening_date],
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


    //Endpoint 8
    // movie.findAll(callback)
    findAll: function(callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("In movie.js findAll ConnError:", err);
                return callback(err, null);
            } else {
                const findAllUsersQuery = "SELECT movieid, title, description, cast, time, opening_date  from movie ;";
                dbConn.query(findAllUsersQuery, (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log("In moovie.js findAll QueryError:", err);
                        return callback(error, null);
                    } else if (!error && results.length == 0) {
                        console.log("In movie.js findAll Results:",results);
                        return callback(null, null);
                    } else {
                        console.log("In movie.js findByID Results:",results);
                        return callback(null, results);
                    }
                });
            }
        });
    },   
    searchMovieByTitle: function(title, callback){
    console.log("In movie.js searchmovietitle" , title);
    var dbConn = db.getConnection();
    dbConn.connect(function (err){
        if(err) {
            console.log("In movie.js findAll ConnError:", err);
            return callback(err, null);
        } else {
            console.log(`Inside movie,js searchmoviebytitle line: ${title} -Connected`);
            const getmovieQuery = 
            `SELECT m.movieid, m.title, m.description, m.cast, m.time, m.opening_date , CONCAT(g.genre, ', ', m.genreid1) as 'genres' from movie m, genre g WHERE m.genreid = g.genreid and m.title LIKE ? GROUP BY m.movieid;` ; 
            dbConn.query(getmovieQuery, [title], function (error, results) {
                dbConn.end();
                if (error) {
                    console.log("In movie.js searchmoviebytitle QueryError:", error);
                    return callback(error, null);
                } else if (!error && results.length == 0) {
                    console.log("In movie.js searchmoviebytitle Results:",results);
                    return callback(null, null);
                } else {
                    console.log("In movie.js searchmoviebytitle Results:",results);
                    return callback(null, results);
                }
            });
        }
    });
},   
    //Endpoint 9
    //movie.findByID(id, callback)
    findByID: function(movieid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
          if (err) {//database connection gt issue!
            console.log(err);
            return callback(err, null);
          } else {
            const findUserByIDQuery = "SELECT m.movieid, m.title, m.description, m.cast, m.time, m.opening_date , CONCAT(g.genre) as 'genre' from movie m, genre g where m.genreid = g.genreid and movieid = ? ;  "
            // SELECT m.movieid, m.title, m.description, m.cast, m.time, m.opening_date , CONCAT(g.genre, ', ', m.genreid1) as 'genres' from movie m, genre g where m.genreid = g.genreid and movieid = ? ;  "
            dbConn.query(findUserByIDQuery, [movieid], (error, results) => {
              dbConn.end();
              if (error) {
                console.log("In movie.js findByID QueryError:",err);
                return callback(error, null); 
              } else if (!error && results.length == 0) {
                  console.log("In movie.js findByID Results: ",results);
                  return callback(null, null);
              } else {
                  console.log("In movie.js findByID Results: ",results);
                  return callback(null, results[0]);
              }
            });
          }
    });
    },

    //Endpoint 10
    //movie.delete(movieid, callback)
    delete: function (movieid, callback) {
        var dbConn =  db.getConnection();
        dbConn.connect(function (err)  {
            if(err) {
                console.log("In movie.js delete ConnError: ", err);
                return callback(err, null);
            } else {
                const deleteUserQuery =
                `
                DELETE FROM movie
                WHERE movieid = ?
                `;
                dbConn.query(deleteUserQuery, [movieid], (error, results) => {
                    dbConn.end();
                    if (error) {
                        return callback(error, null);
                    } else
                    return callback(null, results.affectedRows);
                    });
            }
            });
    },

   

}    