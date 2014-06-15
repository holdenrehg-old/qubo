var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongo = require('mongodb'),
    monk = require('monk'),
    db = monk('localhost:27017/qubo-dev'),
    app = express();

// add mongodb to the request object
app.use(function(req, res, next) {
    req.db = db;
    next();
});

// add cookie parser method to request object
app.use(function(req, res, next) {
    req.parseCookies = function() {
        var numCookies = 0,
            hash = {},
            cookieArr = [];
        if(req.headers.cookie) {
            cookieArr = req.headers.cookie.split(' ');
            numCookies = cookieArr.length;
            // strip semicolons off the end
            if (numCookies) {
                for (var i = 0; i < numCookies; i += 1) {
                    var cookie = cookieArr[i];
                    if (i !== numCookies - 1) {
                        cookie = cookie.substr(0, cookie.length - 1);
                    }
                    cookie = cookie.split('=');
                    hash[cookie[0]] = cookie[1];
                }
            }
        }
        return hash;
    }
    next();
});

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
module.exports = app;

// require all routes for the app
var qubo = require('qubo');
qubo.util('router').init(qubo.routeConfig());

// catch all route
app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

app.listen(3000, function() {
    console.log('\n--- Server is running on port 3000 ---\n');
});
