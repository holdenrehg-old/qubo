// dependencies
var express = require('express');
var logfmt = require('logfmt');
var http = require('http');
var path = require('path');

app = express();

app.use(logfmt.requestLogger());

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// define routes
require('./src/routes');

// undefined route
app.use(function(req, res){
	res.sendfile('./public/index.html');	
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});