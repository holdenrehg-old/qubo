Backbone = require('backbone'),
$ = Backbone.$ = require('jquery');
Qubo = {};
Qubo.paths = require('../../config/paths.json');

var Router = require('./router.js');

App = new Router();
Backbone.history.start({
    pushState: true
});
