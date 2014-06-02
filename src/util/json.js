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
                _.each(data.routes, function(routeInfo, action) {
                    if(routeInfo === true) {
                        app[action](data.url, controller[action]);
                    } else {
                        var url = data.url;
                        if(routeInfo.hasOwnProperty('url')) {
                            url += routeInfo.url;
                        }
                        if(routeInfo.hasOwnProperty('action')) {
                            action = routeInfo.action;
                        }
                        app[routeInfo.verb](url, controller[action]);
                    }
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
