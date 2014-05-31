var assert = require('assert'),
    agent = require('superagent').agent(),
    qubo = require('qubo'),
    routes = qubo.routeConfig(),
    appConfig = qubo.appConfig();

describe('Event API', function() {
    it('GET /event', function(done) {
        agent
            .get(appConfig.fullUrl + '/' + routes.event.url)
            .end(function(err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });
});
