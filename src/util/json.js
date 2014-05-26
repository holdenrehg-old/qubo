var qubo = require('qubo'),
    app = qubo.app(),
    controllers = {},
    JSON = {
        /**
         * Generate express routes from a {}
         */
        routes: function(routes) {
            Object.keys(routes).forEach(function(route, index) {
                JSON.makeRoute(route, routes[route]);
            });
        },
        makeRoute: function(route, data) {
            var controller = JSON.loadController(data.controller);
            data.verbs.forEach(function(verb, index) {
                app[verb](route, controller[verb]);
            });
        },
        loadController: function(name) {
            if (controllers[name] === undefined) {
                controllers[name] = qubo.controller(name);
            }
            return controllers[name];
        }
    };

module.exports = JSON;
