require.config({
    paths: {
        "jquery": "../vendor/jquery/dist/jquery",
        "backbone": "../vendor/backbone/backbone",
        "underscore": "../vendor/underscore/underscore"
    }
});

require(['router', 'backbone', 'jquery'], function(Router, Backbone, $) {
    new Router;
    Backbone.history.start({
        pushState: true
    });
});
