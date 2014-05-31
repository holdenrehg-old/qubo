var Backbone = require('backbone'),
    $ = Backbone.$ = require('jquery'),
    homeMain = require('./views/home/main.hbs'),
    homeHeader = require('./views/home/header.hbs'),
    notFound = require('./views/notFound.hbs');

module.exports = Backbone.Router.extend({
    routes: {
        '': 'index',
        '*notFound': 'notFound'
    },
    index: function() {
        $('header').html(homeHeader());
        $('main').html(homeMain());
        console.log('initializing index route');
    },
    notFound: function() {
        console.log('route not found');
        $('main').html(notFound());
    }
});
