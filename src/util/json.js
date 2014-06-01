var qubo = require('qubo'),
    app = qubo.app(),
    controllers = {},
    Json = {
        /**
         * Generate express routes from an {}
         */
        routes: function(routes) {
            Object.keys(routes).forEach(function(route, index) {
                Json.makeRoute(routes[route]);
            });
        },
        makeRoute: function(data) {
            var controller = Json.loadController(data.controller);
            console.log('\nGenerating routes for ' + data.controller + ' controller\n');
            data.verbs.forEach(function(verb, index) {
                console.log(verb + '\t' + data.url);
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
