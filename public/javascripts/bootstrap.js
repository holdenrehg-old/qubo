var Backbone = require('backbone');
var $ = Backbone.$ = require('jquery');
var Router = require('./router.js');

new Router();
Backbone.history.start({
    pushState: true
});
