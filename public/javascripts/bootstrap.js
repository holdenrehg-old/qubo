var Backbone = require('backbone');
var $ = Backbone.$ = require('jquery');
var Router = require('./router.js');

new Router();
var found = Backbone.history.start({
    pushState: true
});

if (!found) {
	$('body').html(require('./views/templates/notFound.hbs')());
};
