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

app.use(express.static("public"));

var cors = require('cors');
app.options('*', cors());
app.use(cors());

app.use(express.json()); //parse appilcation/json data
app.use(express.urlencoded({ extended: false }));




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
app.get('/users/:userID', /* verifyToken*/ function (req, res) {
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
app.put('/users/:userID', function (req, res) {
    // const userID = parseInt(req.params.userID);
    const userID = req.params.userID;
    if (isNaN(userID)) {
        res.status(400).send("Unacceptable format for user specification");
        return;
    } else {
        user.edit(userID, req.body, function (err, result) {
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
app.post('/genre', verifyToken, function (req, res) {
    console.log("Logged in as: ", req.role);
    if (req.role == "Admin") {
        genre.insert(req.body, function (err, result) {
            if (err) {
                if (err.code == "ER_DUP_ENTRY") {
                    res.status(422).send("The genre name provided already exists.");
                } else {
                    res.status(500).send("Unknown error");
                }
            } else {
                res.status(201).send("genre_Id: " + result);
            }
        });
    };
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
            res.status(500).send("Unknown error");
        }
    });
});


//Endpoint 7
// POST /movie/
app.post('/movie', function (req, res) {
    console.log("Logged in as ", req.role);

    movie.insert(req.body, function (err, result) {
        if (!err) {
            res.status(201).send("movieid:" + result);
        } else {
            res.status(500).send("Unknown error");
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
app.delete('/movie/:movieid/', function (req, res) {
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
app.post('/movie/:movieid/review', function (req, res) {
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
app.use((err, req, res, next) => {
    console.error(err);
    return res.status(err.status || 500).json({ error: err.message || `Unknown Error!` });
});

module.exports = app;