var Backbone = require('backbone'),
    $ = Backbone.$ = require('jquery'),
    Router = require('./router.js'),
    found;

new Router();
found = Backbone.history.start({
    pushState: true
});

if (!found) {
    $('body').html(require('./views/notFound.hbs')());
}
