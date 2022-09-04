// Name : Quek Wei Lin
// Admin  : P1909618
// Class DIT?FT/1B/39
var app = require('./controller/app.js');
var hostname = "localhost";
var port=  process.env.PORT || 8085;

var server = app.listen(port, function () {

    console.log(`Web App Hosted at http://${hostname}:${port}`);

});
