var assert = require('assert'),
    agent = require('superagent').agent(),
    qubo = require('qubo'),
    routes = qubo.routeConfig(),
    appConfig = qubo.appConfig();

describe('Event API', function() {
    it('GET /session', function(done) {
        agent
            .get(appConfig.fullUrl + routes.session.url)
            .end(function(err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });
});