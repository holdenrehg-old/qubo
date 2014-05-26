var assert = require('assert'),
    agent = require('superagent').agent(),
    qubo = require('qubo'),
    routes = qubo.routeConfig(),
    appConfig = qubo.appConfig();

describe('Todo API', function() {
    it('GET /todo', function(done) {
        agent
            .get(appConfig.fullUrl + '/' + routes.todo.url)
            .end(function(err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });
});
