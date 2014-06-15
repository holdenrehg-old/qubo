(function(_, cookie) {

    /**
     * Add before/after functionality to Router
     *
     * http://danialk.github.io/blog/2013/06/08/backbone-tips-after-and-before-methods-for-router/
     */
    Backbone.Router.prototype.route = function(route, name, callback) {
        if (!_.isRegExp(route)) route = this._routeToRegExp(route);
        if (_.isFunction(name)) {
            callback = name;
            name = '';
        }
        if (!callback) callback = this[name];

        var router = this;

        Backbone.history.route(route, function(fragment) {
            var args = router._extractParameters(route, fragment),
                before = router.before.apply(router, arguments),
                accessingAuth = router.authRoutes.indexOf(arguments[0]) !== -1;
                console.log(arguments);
            before
                // user has cookie
                .done(function(res) {
                    if(!accessingAuth) {
                        App.navigate('feed', true);
                    } else {
                        callback && callback.apply(router, args);
                        router.after.apply(router, arguments);

                        router.trigger.apply(router, ['route:' + name].concat(args));
                        router.trigger('route', name, args);
                        Backbone.history.trigger('route', router, name, args);
                    }
                })
                // unauthorized
                .fail(function(res) {
                    if(accessingAuth) {
                        App.navigate('', true);
                    } else {
                        callback && callback.apply(router, args);
                        router.after.apply(router, arguments);

                        router.trigger.apply(router, ['route:' + name].concat(args));
                        router.trigger('route', name, args);
                        Backbone.history.trigger('route', router, name, args);
                    }
                });
        });
        return this;
    };
    Backbone.Router.prototype.before = function() {};
    Backbone.Router.prototype.after = function() {};

    var Router = Backbone.Router.extend({

        HomeView: require('./views/home/home.js'),
        FeedView: require('./views/feed/feed.js'),
        NotFoundView: require('./views/notFound.js'),

        routes: {
            '': 'index',
            'feed': 'feed',
            '*notFound': 'notFound'
        },

        authRoutes: [
            'feed'
        ],

        before: function(options) {
            return $.get('/api/session');
        },

        index: function() {
            new this.HomeView({
                el: $('body'),
                dom: this.getDOM()
            });
        },

        feed: function() {
            console.log('feed route');
            new this.FeedView({
                el: $('body')
            });
        },

        notFound: function() {
            new this.NotFoundView({
                el: $('body')
            });
        },

        getDOM: function() {
            return {
                $header: $('header'),
                $main: $('main'),
                $footer: $('footer')
            };
        }
    });

    module.exports = Router;
})(require('underscore'), require('./util/cookie.js'));
