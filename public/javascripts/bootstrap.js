Backbone = require('backbone'),
$ = Backbone.$ = require('jquery');

var Router = require('./router.js');

new Router();
if (!Backbone.history.start({
    pushState: true
})) {
    $('body').html(require('./views/notFound.hbs')());
}
