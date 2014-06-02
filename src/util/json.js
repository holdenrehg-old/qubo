(function(_, qubo) {

    var app = qubo.app(),
        controllers = {},
        Json = {
            /**
             * Generate express routes from an {}
             */
            routes: function(routes) {
                _.each(routes, function(data) {
                    Json.makeRoute(data);
                });
            },
            makeRoute: function(data) {
                var controller = Json.loadController(data.controller);
                _.each(data.verbs, function(verb) {
                    app[verb](data.url, controller[verb]);
                });
            },
            loadController: function(name) {
                if (controllers[name] === undefined) {
                    controllers[name] = qubo.controller(name);
                }
                return controllers[name];
            }
        };

    module.exports = Json;
})(require('underscore'), require('qubo'));
