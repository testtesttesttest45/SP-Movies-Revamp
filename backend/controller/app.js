//Quek Wei Lin
//P1909618
//DIT/FT/1B/39
var express = require('express');
var app = express();
var user = require('../model/user.js');
var genre = require('../model/genre.js');
var movie = require('../model/movie.js');
var review = require('../model/review.js');
var verifyToken = require('../auth/verifyToken.js');
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config.js");
const isLoggedInMiddleware = require("../auth/isLoggedInMiddleware");
const db = require("../model/databaseConfig");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// allow form data body

app.use(express.static("public"));

var cors = require('cors');
app.options('*', cors());
app.use(cors());

app.use(express.json()); //parse appilcation/json data
app.use(express.urlencoded({ extended: true }));




app.post('/user/login', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    user.loginUser(email, password, function (err, token, result) {
        if (!err && result != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            //delete result[0]['password'];//clear the password in json data, do not send back to client
            res.json({ success: true, UserData: JSON.stringify(result), token: token, status: 'You are successfully logged in!' });
            res.send();
        }
        // check  if message is UserID/Password does not match.
        else if (err.message == "No user found or password incorrect!") {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, status: 'No user found or password incorrect!' });
            res.send();
        }
        else {
            res.status(500);
            res.sendStatus(err.statusCode);
        }
    });
});


app.post('/user/logout', function (req, res) {
    console.log("..logging out.");
    //res.clearCookie('session-id'); //clears the cookie in the response
    //res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, status: 'Log out successful!' });

});

// app.post('/api/login',function(req,res){
//     var email=req.body.email;
//     var password=req.body.password;
//     user.loginUser(email,password,function(err,result){
//         if(!err && result != null) {
//             res.status(200).send("{\"loginResult\":\""+result +"\"}");
//         }else if (result.length == 0) {
//            res.status(403).send("{\"loginResult\":\"Unsuccessful\"}");
//         } else {   
//             res.status(500).send(err.statusCode);
//         }
//     });
// });


//Endpoint 1
// POST /users/
app.post('/signup', function (req, res, next) {
    user.insert(req.body, function (err, result) {
        if (!err) {
            res.statusCode = 201;
            //res.status(201).send("userid: " + result);
            res.json({ success: true, userid: `${result}` });
            res.send();
        }
        else if (err.code == "ER_DUP_ENTRY") {
            res.statusCode = 422;
            res.json({ success: false, message: `The new username provided already exists.` });
            //res.status(422).send("The new username provided already exists.");
        }
        else {
            // ff go next
            next(err);
        }
    });
});
// app.post('/user', function (req, res) {

//     var username = req.body.username;
//     var email = req.body.email;
//     var role = req.body.role;
//     var password = req.body.password;
//     var pic = req.body.pic;

//     user.addUser(username, email, role, password, pic, function (err, result) {
//         if (!err) {
//             res.status(200);
//             res.send(result);
//         } else {
//             res.status(500);
//             res.send("{\"message\":\"Some error!\"}");
//         }
//     });
// });

//Endpoint 2 
// GET all        /users/
app.get('/users', /* isLoggedInMiddleware*/ function (req, res) {
    user.findAll(function (err, result) {
        if (!err && result == null) {
            res.status(404).send("Cannot find any record");
        } else if (!err && result !== null) {
            res.status(200).send(result);
        } else {
            res.status(500).send("Unknown error");
        }
    });
});

//Endpoint 3
// GET /users/:userID/
app.get('/users/:userID', verifyToken.verifyLoggedIn, function (req, res) {
    const userID = req.params.userID; 
    if (isNaN(userID)) {
        res.status(400).send("Unacceptable format for user specification");
        return;
    } else {
        user.findByID(userID, function (err, result) {
            if (!err && result == null) {
                res.status(404).send("Cannot find the requested user");
            } else if (!err && result !== null) {
                res.status(200).send(result);
            } else {
                res.status(500).send("Unknown error");
            }
        });
    }
});

//Endpoint 4
// Enpoint : PUT /user/:userID
app.put('/users/:userID',  verifyToken.verifyLoggedIn, function (req, res) {
    // const userID = parseInt(req.params.userID);
    const userid = parseInt(req.params.userID);
    if (isNaN(userid)) {
        res.status(400).send("Unacceptable format for user specification");
        return;
    } else {
        user.edit(userid, req.body, function (err, result) {
            if (err) {
                if (err.code == "ER_DUP_ENTRY") {
                    res.status(422).send("The new username provided already exists.");
                } else {
                    res.status(500).send("Unknown error");
                }
            } else {// 204 is better for PUT requests
                res.status(200).send("Updated user information successfully!");
            }
        });
    };
});

//Endpoint 5
// POST /genre/
// app.post('/genre', verifyToken.verifyLoggedIn, function (req, res) {
app.post('/genre', verifyToken.verifyAdmin, function (req, res) {
    genre.insert(req.body, function (err, result) {
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                res.status(422).send({ message: "The new genre provided already exists." });
            } else {
                res.status(500).send({ message: "Unknown error" });
            }
        } else {
            res.status(201).send({ message: "New genre added successfully!", genreId: result });
        }
    });
});


//Endpoint 6
// GET all   /genre/
app.get('/genre', function (req, res) {
    genre.findAll(function (err, result) {
        if (!err && result == null) {
            res.status(404).send("Cannot find any genre record");
        } else if (!err && result !== null) {
            res.status(200).send(result);
        } else {
            console.log(err)
            res.status(500).send("Unknown error");
        }
    });
});


//Endpoint 7
// POST /movie/
app.post('/movie', verifyToken.verifyAdmin, function (req, res) { // verifyAdmin middlware
    // console.log("Logged in as ", req.role);
    movie.insert(req.body, function (err, result) {
        if (!err) {
            res.status(201).send({ movie_id: result, status: 201, message: "Movie with ID " + result + " added successfully!" });
        } else if (err && err.code == "ER_DUP_ENTRY") {
            res.status(409).send({ status: 409, message: "The movie name provided already exists." });
        }
        else {
            console.log(err);
            res.status(500).send({ status: 500, message: "Unknown error" });
        }
    });

});


//Endpoint 8
// GET all   /movie/
app.get('/movies', function (req, res) {
    movie.findAll(function (err, result) {
        if (!err && result == null) {
            res.status(404).send("Cannot find any movie record!");
        } else if (!err && result !== null) {
            res.status(200).send(result);
        } else {
            res.status(500).send("Unknown error");
        }
    });
});


//Endpoint 9
// GET /movie/:movieid/
app.get('/movie/:movieid', function (req, res) {
    const movieid = parseInt(req.params.movieid);
    if (isNaN(movieid)) {
        res.status(400).send("Unacceptable format for movie specification");
        return;
    } else {
        movie.findByID(movieid, function (err, result) {
            if (!err && result == null) {
                res.status(404).send("Cannot find the requested movie");
            } else if (!err && result !== null) {
                res.status(200).send(result);
            } else {
                res.status(500).send("Unknown error");
            }
        });
    }
});

// GET /movie/:movieid/
app.get('/searchtitle/:id/', function (req, res) {
    var title = "%" + req.params.id + "%";
    console.log("In appjs get search title", title);
    movie.searchMovieByTitle(title, function (err, result) {
        if (!err && result.length == 0) {
            res.status(404).send("Movie not found");
        } else if (!err) {
            console.log("In appjs search title no error", result);
            res.status(200).json(result);
        } else {
            res.status(500).send("Some error");
        }
    });
});

// app.get("/movie/search/:content", function (req, res) {
//     console.log("In app.get /movie/search/:content");
//     var content = req.params.content;
//     content = "%"+content+"%";
//     console.log(`Looking for ${content} in movie title`);
//     movie.searchMovieByTitle(content,function (err, result) {
//         if (!err) {
//             res.status(200).send(result);
//         } else {
//             res.status(500).send("Some error");
//         }
//     });
// });



//Endpoint 10
// DELETE /movie/:movieID/	
app.delete('/movie/:movieid/', verifyToken.verifyAdmin, function (req, res) { // verifyAdmin middlware
    const movieid = parseInt(req.params.movieid);
    if (isNaN(movieid)) {
        res.status(400).send("Unacceptable format for movie specification");
        return;
    } else {
        movie.delete(movieid, function (err, result) {
            if (!err && result == null) {
                res.status(404).send("Cannot find the requested movie");
            } else if (!err && result !== null) {
                res.sendStatus(204);
            } else {
                res.status(500).send("Unknown error");
            }
        });
    }
});


//Endpoint 11
// POST /movie/:movieID/reviews
app.post('/movie/:movieid/review', verifyToken.verifyLoggedIn, function (req, res) {
    console.log("Logged in as ", req.role);
    // if (req.role == "Customer") {
    review.insert(req.body, function (err, result) {
        if (!err) {
            res.status(201).send("reviewID:" + result + " is posted!");
        } else {
            res.status(500).send("Unknown error");
        }
    });

});

//Endpoint 12
// GET /movie/:movieID/reviews
app.get('/movie/:movieid/reviews', function (req, res) {
    const movieid = parseInt(req.params.movieid);
    if (isNaN(movieid)) {
        res.status(400).send("Unacceptable format for movie specification");
        return;
    } else {
        review.findByID(movieid, function (err, result) {
            if (!err && result == null) {
                res.status(404).send("Cannot find the requested movie and/or the reviews");
            } else if (!err && result !== null) {
                res.status(200).send(result);
            } else {
                res.status(500).send("Unknown error");
            }
        });
    }
});

app.post('/comment/:movieID', verifyToken.verifyLoggedIn, function (req, res) {
    const movieID = parseInt(req.params.movieID);
    const { userID, comment } = req.body;
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
        if (err) {
            // console.log("Error connecting to Db");
            return;
        }
        console.log("Connection established");
        var sql = "INSERT INTO comments (movie_id, user_id, comment) VALUES (?, ?, ?)";
        var params = [movieID, userID, comment];
        dbConn.query(sql, params, function (err, result) {
            if (err) {
                // console.log("Error inserting comment");
                return;
            }
            res.send({ message: "Comment inserted" });
        });
        dbConn.end();
    })
});

app.get('/comment/:movieID', function (req, res) {
    const movieID = parseInt(req.params.movieID);
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
        if (err) {
            console.log("Error connecting to Db");
            return;
        }
        console.log("Connection established");
        // use inner join to change comment table user_id 1 to terry from user table
        var sql = "SELECT c.comment, u.username, u.pic, c.created_on FROM comments c INNER JOIN user u ON c.user_id = u.userID WHERE c.movie_id = ?"
        var params = [movieID];
        dbConn.query(sql, params, function (err, result) {
            if (err) {
                console.log(err)
                return;
            }
            // console.log(result.length)
            res.status(200).send(result);
        });
        dbConn.end();
    });
});

app.post('/review/:movieID',  verifyToken.verifyLoggedIn, function (req, res) {
    const movieID = parseInt(req.params.movieID);
    const { userID, rating, review } = req.body;
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
        if (err) {
            // console.log("Error connecting to Db");
            return;
        }
        console.log("Connection established");
        var sql = "INSERT INTO reviews (movie_id, user_id, rating, review) VALUES (?, ?, ?, ?)";
        var params = [movieID, userID, rating, review];
        dbConn.query(sql, params, function (err, result) {
            if (err) {
                console.log(err)
                // console.log("Error inserting comment");
                return;
            }
            res.send({ message: "Review inserted" });
        });
        dbConn.end();
    })
});

app.get('/review/:movieID', function (req, res) {
    const movieID = parseInt(req.params.movieID);
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
        if (err) {
            console.log("Error connecting to Db");
            return;
        }
        console.log("Connection established"); // display latest 3 reviews
        var sql = "SELECT r.user_id, r.rating, r.review, u.username, u.pic, r.created_on FROM reviews r INNER JOIN user u ON r.user_id = u.userID WHERE r.movie_id = ? ORDER BY r.created_on DESC LIMIT 3"
        var params = [movieID];
        dbConn.query(sql, params, function (err, result) {
            if (err) {
                console.log(err)
                return;
            }
            res.status(200).send(result);
        });
        dbConn.end();
        console.log("Connection closed");
    });
});

app.post("/favourite/:movieId",  verifyToken.verifyLoggedIn, function (req, res) {
    const movieId = parseInt(req.params.movieId);
    const { userId, favourite } = req.body;
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
        if (err) {
            // console.log("Error connecting to Db");
            return;
        }
        // PUT request to update column isFavourite to 1(true)
        var sql = "INSERT INTO favourites (movie_id, user_id, isFavourite) VALUES (?, ?, ?)";
        var params = [movieId, userId, favourite];
        dbConn.query(sql, params, function (err, result) {
            if (err) {
                return;
            }
            res.status(201).send({ message: "Added to favourites" });
        });
        dbConn.end();
    })
});

app.get("/favourite/:movieId", verifyToken.verifyLoggedIn, function (req, res) {
    const movieId = parseInt(req.params.movieId);
    const userID = req.query.userId;
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
        if (err) {
            console.log("Error connecting to Db");
            return;
        }
        console.log("Connection established");
        var sql = "SELECT * FROM favourites WHERE movie_id = ? and user_id = ?";
        var params = [movieId, userID];
        dbConn.query(sql, params, function (err, result) {
            if (err) {
                return;
            }
            res.status(200).send(result);
        })
        dbConn.end();
    })
});

app.delete("/favourite/:movieId", verifyToken.verifyLoggedIn, function (req, res) {
    const movieId = parseInt(req.params.movieId);
    const { userId } = req.body;
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
        if (err) {
            return;
        }
        var sql = "DELETE FROM favourites WHERE movie_id = ? AND user_id = ?";
        var params = [movieId, userId];
        dbConn.query(sql, params, function (err, result) {
            if (err) {
                return;
            }
            res.status(200).send({ message: "Removed from favourites" });
        });
        dbConn.end();
    })
});

app.delete("/user/:userId", verifyToken.verifyLoggedIn, function (req, res) {
    const userId = parseInt(req.params.userId);
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
        if (err) {
            return;
        }
        var sql = "DELETE FROM user WHERE userID = ?";
        var params = [userId];
        dbConn.query(sql, params, function (err, result) {
            if (err) {
                return;
            }
            res.status(200).send({ message: "User deleted" });
        });
        dbConn.end();
    })
});

app.put("/user/:userId", verifyToken.verifyLoggedIn, function (req, res) {
    console.log(req.file);
    const userId = parseInt(req.params.userId);
    const { username, email, contact, password, picture } = req.body;
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
        if (err) {
            return;
        }
        var sql = "UPDATE user SET username = ?, email = ?, contact = ?, password = ?, pic = ? WHERE userID = ?";
        var params = [username, email, contact, password, picture, userId];
        dbConn.query(sql, params, function (err, result) {
            // if error is conflict, show this message
            if (err && err.code === "ER_DUP_ENTRY") {
                res.send({ message: "Username or email already exists", status: 409 });
                return;
            }
            else if (err) {
                return;
            }
            res.send({ message: "User updated", status: 200 });

        });
        dbConn.end();
    })
});

app.get("/userFavourite/:userId", verifyToken.verifyLoggedIn, function (req, res) {
    const userId = parseInt(req.params.userId);
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
        if (err) {
            console.log("Error connecting to Db");
            return;
        }
        console.log("Connection established");
        // select from favourites where user_id = ? and will also look at movie_id to reference movie table and take the title where movie_id = movie_id in favourites
        var sql = "SELECT m.movieid, m.title, m.thumbnail, m.opening_date FROM favourites f INNER JOIN movie m ON f.movie_id = m.movieid WHERE f.user_id = ?";
        var params = [userId];
        dbConn.query(sql, params, function (err, result) {
            if (err) {
                return;
            }
            res.status(200).send(result);
        })
        dbConn.end();
    })
});

// create an appget request with the search text in the query params
app.get("/search", function (req, res) {
    const searchText = req.query.searchText;
    // so the backend will look like this: https://sp-movies-backend.herokuapp.com/search?searchText=avengers
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
        if (err) {
            console.log("Error connecting to Db");
            return;
        }
        console.log("Connection established");
        // for IFNULL, I also experimented:  SELECT  title, IF(cast = "" ,'empty' ,cast)  as cast FROM movie
        // NULL and 0 and "" are not the same thing
        var sql = `SELECT m.movieid, m.title, m.time, m.opening_date, 
        IFNULL(ROUND(AVG(r.rating),1),0) AS score, m.thumbnail, CONCAT(g1.genre, ", " ,g2.genre) AS genre, m.description, m.cast 
        FROM movie m LEFT JOIN reviews r ON m.movieid = r.movie_id 
        LEFT JOIN genre g1 ON m.genreid = g1.genreID 
        LEFT JOIN genre g2 ON m.genreid1 = g2.genreID WHERE m.title LIKE ? GROUP BY m.movieid`;
        var params = ["%" + searchText + "%"];
        dbConn.query(sql, params, function (err, result) {
            if (err) {
                return;
            }
            res.status(200).send(result);
        })
        dbConn.end();
    })
});

app.put("/movie/:movieId", verifyToken.verifyAdmin, function (req, res) { // verifyAdmin
    const movieId = parseInt(req.params.movieId);
    const { title, time, opening_date, genreid, genreid1, description, cast, thumbnail } = req.body;
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
        if (err) {
            console.log(err)
            return;
        }
        // var sql = "UPDATE movie SET title = ?, time = ?, opening_date = ?, genreid = ?, genreid1 = ?, description = ?, cast = ? WHERE movieid = ?";
        // the sql query will convert genreid and genreid1 from text to genre id with reference to genre table. I will be using inbar statement to do this
        var sql = `UPDATE movie SET title = ?, time = ?, opening_date = ?, genreid = (SELECT genreID FROM genre WHERE genre = ?), 
        genreid1 = (SELECT genreID FROM genre WHERE genre = ?), description = ?, cast = ?, thumbnail = IF(? = "", 'noImage.png', ?) WHERE movieid = ?`;
        var params = [title, time, opening_date, genreid, genreid1, description, cast, thumbnail, thumbnail, movieId];
        dbConn.query(sql, params, function (err, result) {
            if (err && err.code === "ER_DUP_ENTRY") {
                res.status(409).send({ message: "Title already exists", status: 409 });
                return;
            }
            else if (err) {
                console.log(err)
                res.status(500).send({ message: "Error updating movie" + err, status: 500 });
                return;
            } else {
                res.status(200).send({ message: "Movie updated", status: 200 });
            }
        });
        dbConn.end();
    })
});

app.delete("/genre/:genreId", verifyToken.verifyAdmin, function (req, res) { // veryfyAdmin
    const genreId = parseInt(req.params.genreId);
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
        if (err) {
            return;
        }
        var sql = "DELETE FROM genre WHERE genreID = ?";
        var params = [genreId];
        dbConn.query(sql, params, function (err, result) {
            if (err) {
                res.status(500).send({ message: "Error deleting genre " + err, status: 500 });
                return;
            }
            res.status(200).send({ message: "Genre deleted successfully", status: 200 });
        });
        dbConn.end();
    })
});

app.put("/genre/:genreId", verifyToken.verifyAdmin, function (req, res) { // verifyAdmin
    const genreId = parseInt(req.params.genreId);
    const { genre, description } = req.body;
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
        if (err) {
            return;
        }
        var sql = "UPDATE genre SET genre = ?, description = ? WHERE genreID = ?";
        var params = [genre, description, genreId];
        dbConn.query(sql, params, function (err, result) {
            if (err && err.code === "ER_DUP_ENTRY") {
                res.status(409).send({ message: "Unable to update. Genre already exists", status: 409 });
                return;
            }
            else if (err) {
                res.status(500).send({ message: "Error updating genre " + err, status: 500 });
                return;
            } else {
                res.status(200).send({ message: "Genre updated", status: 200 });
            }
        });
        dbConn.end();
    })
});

app.get("/genre/:genreId", function (req, res) {
    const genreId = parseInt(req.params.genreId);
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
        if (err) {
            return;
        }
        var sql = "SELECT * FROM genre WHERE genreID = ?";
        var params = [genreId];
        dbConn.query(sql, params, function (err, result) {
            if (err) {
                res.status(500).send({ message: "Error getting genre " + err, status: 500 });
                return;
            } else {
                res.status(200).send({ message: "Genre retrieved", status: 200, result });
            }
        });
        dbConn.end();
    })
});

app.delete("/users/:userId", verifyToken.verifyAdmin, function (req, res) { //verifyAdmin
    const userId = parseInt(req.params.userId);
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
        if (err) {
            return;
        }
        var sql = "DELETE FROM user WHERE userid = ?";
        var params = [userId];
        dbConn.query(sql, params, function (err, result) {
            if (err) {
                res.status(500).send({ message: "Error deleting user " + err, status: 500 });
                return;
            }
            console.log(result)
            res.status(200).send({ message: "User " + userId + " deleted successfully", status: 200 });
        });
        dbConn.end();
    })
});

// this app.put endpoint /users/:userId is used to update the user role
app.put("/users/:userId/role", verifyToken.verifyAdmin, function (req, res) { //verifyAdmin
    const userId = parseInt(req.params.userId);
    const { role } = req.body;
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
        if (err) {
            return;
        }
        var sql = "UPDATE user SET role = ? WHERE userid = ?";
        var params = [role, userId];
        dbConn.query(sql, params, function (err, result) {
            if (err) {
                res.status(500).send({ message: "Error updating user " + err, status: 500 });
                return;
            } else {
                res.status(200).send({ message: "User " + userId + " updated successfully", status: 200 });
            }
        });
        dbConn.end();
    })
});

app.use((err, req, res, next) => {
    console.error(err);
    return res.status(err.status || 500).json({ error: err.message || `Unknown Error!` });
});

module.exports = app;