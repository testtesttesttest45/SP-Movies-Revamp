// Name : Quek Wei Lin
// Admin  : P1909618
// Class DIT/FT/1B/39



// we can rename connection as db or anything we choose.
const db = require("./databaseConfig");
const config = require("../config.js");
var jwt = require('jsonwebtoken');

module.exports = {


    loginUser: function (emailOrUsername, password, callback) {

        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");

                var sql = 'SELECT * FROM user WHERE (email=? OR username=?) AND password=?';

                conn.query(sql, [emailOrUsername, emailOrUsername, password], function (err, result) {
                    conn.end();
                    console.log(result.length)
                    if (err) {
                        console.log("Err: " + err);
                        return callback(err, null, null);
                    }
                    else if (result.length == 0) {
                        console.log("No user found or password incorrect!");
                        var err2 = new Error("No user found or password incorrect!");
                        return callback(err2, null, null);
                    } else {
                        let token = jwt.sign({ userid: result[0].userID, username: result[0].username, role: result[0].role }, config.key, {
                            expiresIn: '1h'
                        });
                        return callback(null, token, result);
                    }
                });
            }
        });
    },

    // loginUser: function (email,password, callback) {
    //     var conn = db.getConnection();
    //     conn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             return callback(err,null);
    //         } else {
    //             console.log("Connected!");
    //             // usually developers like to SELECT only userid and role/type
    //             var sql = 'SELECT * FROM user WHERE email=? AND password=?';
    //             //var sql = 'SELECT userid, role FROM user WHERE email=? AND password=?';
    //             conn.query(sql, [email,password], function (err, result) {
    //                 conn.end();       
    //                 if (err) {
    //                     console.log(err);
    //                     return callback(err,null);
    //                 } else if (result.length == 0) {
    //                     return callback(null, result);
    //                 } else {    
    //                     // var msg="{\"userid\":\""+result[0].userID +"\"}";               
    //                     // return callback(null, msg);

    //                     //console.log(config.key);
    //                     var token="";
    //                     if(result.length==1){
    //                         token=jwt.sign({
    //                             userid:result[0].userid,
    //                             role:result[0].role
    //                         },
    //                         config.key,{
    //                             expiresIn:600//expires in 10mins
    //                         });
    //                     }
    //                     return callback(null,token);
    //                 }
    //             });
    //         }
    //     });
    // },


    //Endpoint 1
    //user.insert(user, callback)
    insert: function (user, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("In user.js insert ConnError: ", err);
                return callback(err, null);
            } else {
                const insertUserQuery =
                    `
                INSERT INTO user (username, email, contact, password, role, pic)
                VALUES (?, ?, ?, ?, 'Customer', null) ;
                `;
                dbConn.query(
                    insertUserQuery,
                    [user.username, user.email, user.contact, user.password, user.role, user.pic],
                    (error, results) => {
                        dbConn.end();
                        if (error) {
                            // if there is an error for example if the user already exists, we want to return that error
                            return callback(error, null);
                            
                        } else {
                            // console.log(results);
                            return callback(null, results.insertId);
                        }
                    });

            }
        });

    },

    //Endpoint 2
    // user.findAll(callback)
    findAll: function (callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("In user.js findAll ConnError:", err);
                return callback(err, null);
            } else {
                const findAllUsersQuery = "SELECT userid, username, email, contact, role, pic, created_at FROM user;";
                dbConn.query(findAllUsersQuery, (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log("In user.js findAll QueryError:", err);
                        return callback(error, null);
                    } else if (!error && results.length == 0) {
                        // console.log("In user.js findAll Results:", results);
                        return callback(null, null);
                    } else {
                        // console.log("In user.js findByID Results:", results);
                        return callback(null, results);
                    }
                });
            }
        });
    },


    //Endpoint 3
    //user.findByID(id, callback)
    findByID: function (userID, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                const findUserByIDQuery = "SELECT userid, username, email, password, contact, role, pic, created_at FROM user WHERE userID = ?;";
                dbConn.query(findUserByIDQuery, [userID], (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log("In user.js findByID QueryError:", err);
                        return callback(error, null);
                    } else if (!error && results.length == 0) {
                        console.log("In user.js findByID Results: ", results);
                        return callback(null, null);
                    } else {
                        console.log("In user.js findByID Results: ", results);
                        return callback(null, results[0]);
                    }
                });
            }
        });
    },


    //Endpoint 4
    //user.edit(userID, user, callback)
    edit: function (userID, user, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("In user.js edit ConnError:", err);
                return callback(err, null);
            } else {
                const editUserQuery =
                    `
                UPDATE user
                SET
                    username = ?,
                    email = ?,
                    contact = ?,
                WHERE userID = ?;
                `;
                dbConn.query(editUserQuery, [user.username, user.email, user.contact, userID], (error, results) => {
                    dbConn.end();
                    // console.log("New values:", user.username, user.email, user.contact, user.password, user.role, user.pic, userID)
                    if (error) {
                        console.log(error)
                        return callback(error, null);
                    } else {
                        console.log("Results:", results.affectedRows)
                        return callback(null, results.affectedRows);
                    }
                });
            }
        });
    },


}    