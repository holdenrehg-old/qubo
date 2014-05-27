var Backbone = require('backbone'),
    $ = Backbone.$ = require('jquery'),
    indexView = require('./views/templates/index.hbs'),
    testingView = require('./views/templates/testing.hbs'),
    notFound = require('./views/templates/notFound.hbs');

module.exports = Backbone.Router.extend({
    routes: {
        '': 'index',
        'testing': 'testing',
        '*notFound': 'notFound'
    },
    index: function() {
        $('body').html(indexView({name: "Holden"}));
        console.log('initializing index route');
    },
    testing: function() {
        $('body').html(testingView());
        console.log('initializing testing route');
    },
    notFound: function() {
        console.log('route not found');
        $('body').html(notFound());
    }
});
