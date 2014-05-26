var assert = require('assert'),
    agent = require('superagent').agent(),
    qubo = require('qubo'),
    routes = qubo.routeConfig(),
    appConfig = qubo.appConfig();

describe('User API', function() {
    it('GET /user', function(done) {
        agent
            .get(appConfig.fullUrl + '/' + routes.user.url)
            .end(function(err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });
});
