// Name : Quek Wei Lin
// Admin  : P1909618
// Class DIT/FT/1B/39

const db = require("./databaseConfig");

module.exports = {

    //Endpoint 7
    //movie.insert(user, callback)
    insert: function (movie, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("In movie.js insert ConnError: ", err);
                return callback(err, null);
            } else {
                //  INSERT INTO movie (title, description, cast, genreid, genreid1, time, opening_date)
                // const insertUserQuery = `INSERT INTO movie (title, description, cast, genreid, genreid1, time, opening_date)
                // VALUES (?, ?, ?, ?, ?, ?, ?);
                // `;
                // the query will insert the data. Reference the genre name from genre table so that the genreID will be inserted
                const insertUserQuery = `INSERT INTO movie (title, description, cast, genreid, genreid1, time, opening_date, thumbnail) 
                                        VALUES (?, ?, ?, (SELECT genreID from genre WHERE genre = ?), (SELECT genreID from genre WHERE genre = ?), ?, ?, IF(? = '', 'noImage.png', ?));`
                dbConn.query(
                    insertUserQuery,
                    [movie.title, movie.description, movie.cast, movie.genreid, movie.genreid1, movie.time, movie.opening_date, movie.thumbnail, movie.thumbnail],
                    (error, results) => {
                        dbConn.end();
                        if (error) {
                            return callback(error, null);
                        } else {
                            // console.log("The thumbnail is " + movie.thumbnail);
                            return callback(null, results.insertId);
                        }
                    });

            }
        });

    },


    //Endpoint 8
    // movie.findAll(callback)
    findAll: function (callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("In movie.js findAll ConnError:", err);
                return callback(err, null);
            } else {
                // const findAllUsersQuery = "SELECT movieid, title, description, cast, time, opening_date  from movie ;";
                // every movie has 2 columns of genreid. Reference both of them to get the genre of the movie.
                // var sql = "SELECT m.title, m.description, m.cast, m.time, m.opening_date, g1.genre, g2.genre FROM movie m LEFT JOIN genre g1 ON m.genreid = g1.genreid LEFT JOIN genre g2 ON m.genreid1 = g2.genreid;"
                // concat the two genre columns into one column called genre.
                var findAllUsersQuery = `SELECT m.movieid, m.title, m.time, m.opening_date, IFNULL(ROUND(AVG(r.rating),2),0) AS score, m.thumbnail, CONCAT(g1.genre, ", " ,g2.genre) AS genre, m.description, m.cast FROM movie m LEFT JOIN reviews r ON m.movieid = r.movie_id LEFT JOIN genre g1 ON m.genreid = g1.genreID LEFT JOIN genre g2 ON m.genreid1 = g2.genreID GROUP BY m.movieid;`
                dbConn.query(findAllUsersQuery, (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log("In moovie.js findAll QueryError:", err);
                        return callback(error, null);
                    } else if (!error && results.length == 0) {
                        // console.log("In movie.js findAll Results:",results);
                        return callback(null, null);
                    } else {
                        // console.log("In movie.js findByID Results:",results);
                        return callback(null, results);
                    }
                });
            }
        });
    },
    searchMovieByTitle: function (title, callback) {
        // console.log("In movie.js searchmovietitle" , title);
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("In movie.js findAll ConnError:", err);
                return callback(err, null);
            } else {
                console.log(`Inside movie,js searchmoviebytitle line: ${title} -Connected`);
                const getmovieQuery =
                    `SELECT m.movieid, m.title, m.description, m.cast, m.time, m.opening_date , CONCAT(g.genre, ', ', m.genreid1) as 'genres' from movie m, genre g WHERE m.genreid = g.genreid and m.title LIKE ? GROUP BY m.movieid;`;
                dbConn.query(getmovieQuery, [title], function (error, results) {
                    dbConn.end();
                    if (error) {
                        console.log("In movie.js searchmoviebytitle QueryError:", error);
                        return callback(error, null);
                    } else if (!error && results.length == 0) {
                        // console.log("In movie.js searchmoviebytitle Results:",results);
                        return callback(null, null);
                    } else {
                        // console.log("In movie.js searchmoviebytitle Results:",results);
                        return callback(null, results);
                    }
                });
            }
        });
    },
    //Endpoint 9
    //movie.findByID(id, callback)
    findByID: function (movieid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                // const findUserByIDQuery = "SELECT m.movieid, m.title, m.description, m.cast, m.time, m.opening_date , m.thumbnail,  CONCAT(g.genre) as 'genre' from movie m, genre g where m.genreid = g.genreid and movieid = ? ;  "
                const findUserByIDQuery = `
                SELECT m.movieid, m.title, m.time, m.opening_date, g1.genre, g2.genre AS subgenre, IFNULL(ROUND(AVG(r.rating),2),0) as score, m.description, m.cast, m.thumbnail 
                FROM movie m  
                LEFT JOIN genre g1 ON m.genreid = g1.genreID 
                LEFT JOIN genre g2 ON m.genreid1 = g2.genreID
                LEFT JOIN reviews r ON m.movieid = r.movie_id 
                WHERE movieid = ?
                GROUP BY m.movieid;`
                dbConn.query(findUserByIDQuery, [movieid], (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log("In movie.js findByID QueryError:", err);
                        return callback(error, null);
                    } else if (!error && results.length == 0) {
                        // console.log("In movie.js findByID Results: ",results);
                        return callback(null, null);
                    } else {
                        // console.log("In movie.js findByID Results: ",results);
                        return callback(null, results[0]);
                    }
                });
            }
        });
    },

    //Endpoint 10
    //movie.delete(movieid, callback)
    delete: function (movieid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
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