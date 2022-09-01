var jwt = require('jsonwebtoken');
var config = require('../config');


// function verifyToken(req, res, next) {
exports.verifyLoggedIn = (req, res, next)  => {
    // console.log("req.headers", req.headers);

    var token = req.headers['authorization']; //retrieve authorization header’s content
    console.log("1", token);

    // if (!token || !token.includes('Bearer')){ //process the token
    if (!token) { //process the token
        // res.status(403);
        // return res.send({ auth: 'false', message: 'Please login first!' });
        return res.status(403).send({ auth: 'false', message: 'Please login first!' });
    } else {
        // token = token.split('')[1]; //obtain the token’s value
        // console.log("2", token);
        jwt.verify(token, config.key, function (err, decodedToken) {//verify token
            if (err) {
                res.status(500);
                return res.send({ auth: false, message: 'Failed to authenticate token.' });
            } else {
                req.userId = decodedToken.userid; //decode the userid and store in req for use
                req.role = decodedToken.role; //decode the role and store in req for use
                next();
            }
        });
    }

};

exports.verifyAdmin = (req, res, next) => {
    var token = req.headers['authorization']; //retrieve authorization header’s content
    if (!token) { //  process the token
        res.status(403);
        return res.send({ auth: 'false', message: 'Unauthorised Token not found' });
    } else {
        // console.log("token", token);
        // token = token.split('Bearer ')[1]; //obtain the token’s value
        // console.log("token", token);
        jwt.verify(token, config.key, function (err, decodedToken) {//verify token
            if (err) {
                console.log("err", err);
                res.status(500);
                return res.end({ auth: false, message: 'Failed to authenticate token.' });
            }
            else {
                req.role = decodedToken.role; //decode the role and store in req for use
                console.log(req.role);
                if (req.role === 'Admin') {
                    next();
                } else {
                    // console.log(req.role);
                    // res.status(403);
                    // return res.send({ auth: 'false', message: 'Unauthorized!' });
                    return res.status(403).send({ auth: 'false', message: 'Unauthorized!' });
                }
            }
        });
    }
}

