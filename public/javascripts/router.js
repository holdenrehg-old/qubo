module.exports = Backbone.Router.extend({

    HomeView: require('./views/home/home.js'),
    NotFoundView: require('./views/notFound.js'),

    routes: {
        '': 'index',
        '*notFound': 'notFound'
    },

    index: function() {
        new this.HomeView({
            el: $('body')
        });
    },

    notFound: function() {
        new this.NotFoundView({
            el: $('body')
        });
    }
});
