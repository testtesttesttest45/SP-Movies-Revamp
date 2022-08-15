// Name : Quek Wei Lin
// Admin  : P1909618
// Class DIT/FT/1B/39

const db = require("./databaseConfig");

module.exports = {
    
    //Endpoint 11
    //movie.insert(user, callback)
    insert: function(review, callback) {
        var dbConn =  db.getConnection();
        dbConn.connect(function (err)  {
            if(err) {
                console.log("In review.js insert ConnError: ", err);
                return callback(err, null);
            } else {
                const  insertUserQuery =
                `
                INSERT INTO review (movieid, userid, rating, review)
                VALUES (?, ?, ?, ?);
                `;
                dbConn.query(
                  insertUserQuery,
                  [review.movieid, review.userid, review.rating, review.review],
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

    //Endpoint 12
    //moviereview.findByID(id, callback)
    findByID: function(movieid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
          if (err) {//database connection gt issue!
            console.log(err);
            return callback(err, null);
          } else {
            const findUserByIDQuery = "select r.reviewid, r.movieid, r.userid, u.username, r.rating, r.review, r.created_at from review r, user u where r.userid = u.userid and movieid='?';  ";
            dbConn.query(findUserByIDQuery, [movieid], (error, results) => {
              dbConn.end();
              if (error) {
                console.log("In review.js findByID QueryError:",err);
                return callback(error, null); 
              } else if (!error && results.length == 0) {
                  console.log("In review.js findByID Results: ",results);
                  return callback(null, null);
              } else {
                  console.log("In review.js findByID Results: ",results);
                  return callback(null, results);
              }
            });
          }
    });
    },


}    