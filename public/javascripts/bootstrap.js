Backbone = require('backbone'),
$ = Backbone.$ = require('jquery');

var Router = require('./router.js');

App = new Router();
Backbone.history.start({
    pushState: true
});
