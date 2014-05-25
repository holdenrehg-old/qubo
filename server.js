var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongo = require('mongodb'),
    monk = require('monk'),
    qubo = require('qubo'),
    db = monk('localhost:27017/qubo-dev'),
    app = express();

// add mongodb to the request object
app.use(function(req, res, next) {
    req.db = db;
    next();
});

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
module.exports = app;

// require all routes for the app
qubo.routes();

app.listen(3000, function() {
    console.log('\n--- Server is running on port 3000 ---\n');
});
