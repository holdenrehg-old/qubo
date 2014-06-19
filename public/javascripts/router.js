(function(_, User, cookie) {

    var Router = Backbone.Router.extend({

        HomeView: require('./views/home/home.js'),
        FeedView: require('./views/feed/feed.js'),
        ProfileView: require('./views/profile/profile.js'),
        ExploreView: require('./views/explore/explore.js'),
        SettingsView: require('./views/settings/settings.js'),
        NotFoundView: require('./views/notFound.js'),

        routes: {
            '': 'index',
            'feed(/)': 'feed',
            'explore(/)': 'explore',
            'settings(/)': 'settings',
            'logout(/)': 'logout',
            ':username(/)': 'profile',
            '*notFound': 'notFound'
        },

        authRoutes: [
            'feed',
            'settings',
            'profile',
            'logout'
        ],

        index: function() {
            new this.HomeView({
                el: $('body'),
                dom: this.getDOM()
            });
        },

        feed: function(args, currentUser) {
            new this.FeedView({
                el: $('body'),
                dom: this.getDOM(),
                currentUser: currentUser
            });
        },

        explore: function(args, currentUser) {
            new this.ExploreView({
                el: $('body'),
                dom: this.getDOM(),
                currentUser: currentUser
            });
        },

        settings: function(args, currentUser) {
            new this.SettingsView({
                el: $('body'),
                dom: this.getDOM(),
                currentUser: currentUser
            });
        },

        profile: function(username, args, currentUser) {
            var user = new User({
                id: username
            }),
                self = this;
            user.fetch({

                success: function(user) {
                    console.log(user);
                    new self.ProfileView({
                        el: $('body'),
                        dom: self.getDOM(),
                        user: user,
                        currentUser: currentUser
                    });
                },

                error: function() {
                    $('body').html('user does not exist');
                }
            });
        },

        logout: function() {
            var promise = $.ajax({
                url: '/api/session',
                type: 'DELETE'
            });

            promise
                .done(function() {
                    App.navigate('feed', true);
                })
                .fail(function() {
                    console.log('there was a problem');
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
                $footer: $('footer'),
                $sidenav: $('#sidenav')
            };
        }
    });

    /**
     * Add before functionality
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
                accessingAuth = router.authRoutes.indexOf(name) !== -1,
                user = new User();

            user.fetch({
                // user has a session
                success: function(user) {
                    args.push(user);

                    // trying to access the home page after logged in
                    if (!accessingAuth && name === 'index') {
                        App.navigate('feed', true);
                    } else {
                        callback && callback.apply(router, args);

                        router.trigger.apply(router, ['route:' + name].concat(args));
                        router.trigger('route', name, args);
                        Backbone.history.trigger('route', router, name, args);
                    }
                },

                // unauthorized user
                error: function() {

                    // tryin to access authorized route
                    if (accessingAuth) {
                        App.navigate('', true);
                    } else {
                        callback && callback.apply(router, args);

                        router.trigger.apply(router, ['route:' + name].concat(args));
                        router.trigger('route', name, args);
                        Backbone.history.trigger('route', router, name, args);
                    }
                }
            });
        });
        return this;
    };

    module.exports = Router;
})(
    require('underscore'),
    require('./models/user.js'),
    require('./util/cookie.js')
);
