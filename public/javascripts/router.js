var Backbone = require('backbone'),
    $ = Backbone.$ = require('jquery'),
    indexView = require('./views/templates/index.hbs'),
    testingView = require('./views/templates/testing.hbs');

module.exports = Backbone.Router.extend({
    routes: {
        '': 'index',
        'testing': 'testing'
    },
    index: function() {
        $('body').html(indexView({name: "Holden"}));
        console.log('initializing index route');
    },
    testing: function() {
        $('body').html(testingView());
        console.log('initializing testing route');
    }
});
