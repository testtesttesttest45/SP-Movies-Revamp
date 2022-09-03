const express = require('express');
const serveStatic = require('serve-static');

var hostname = "localhost";
var port = 3001;
var multer = require('multer');

var app = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../backend/public/image/movies')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage })






app.use(serveStatic(__dirname + "/public"));
// app.use /uploads which is outside of the frontend folder and inside the backend folder
app.use('/backend/public/image/movies', express.static('../backend/public/image/movies'));
app.post('/thumbnail-upload-single', upload.single('thumbnail-file'), function (req, res, next) {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    console.log(req.file.originalname);
    var response = {
        message: 'File uploaded successfully',
        filename: req.file.originalname
    };
    return res.send(response)
})

app.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.method);
    console.log(req.path);
    console.log(req.query.id);

    if (req.method != "GET") {
        res.type('.html');
        var msg = "<html><body>This server only serves web pages with GET!</body></html>";
        res.end(msg);
    } else {
        next();
    }
});

app.listen(port, hostname, function () {

    console.log(`Server hosted at http://${hostname}:${port}`);
});