var express  = require('express');
var connect = require('connect');
var app      = express();
var port     = process.env.PORT || 5475;
 
// Configuration
app.use(express.static(__dirname + '/public'));
//app.use(connect.cookieParser());
//app.use(connect.logger('dev'));
//app.use(connect.bodyParser());
 
//app.use(connect.json());
//app.use(connect.urlencoded());

require('./routes/routes.js')(app);
app.listen(port);
console.log('Server http run on port ' + port);