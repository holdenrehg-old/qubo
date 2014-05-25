var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    qubo = require('qubo'),
    app = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
module.exports = app;

qubo.routes();

app.listen(3000, function() {
    console.log('\n--- Server is running on port 3000 ---\n');
});
