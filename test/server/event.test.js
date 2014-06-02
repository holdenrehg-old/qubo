var assert = require('assert'),
    agent = require('superagent').agent(),
    qubo = require('qubo'),
    routes = qubo.routeConfig(),
    appConfig = qubo.appConfig();

describe('Event API', function() {
    it('GET /event 200 status', function(done) {
        agent
            .get(appConfig.fullUrl + routes.event.url)
            .end(function(err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });

    it('POST /event 201 status', function(done) {
        agent
            .post(appConfig.fullUrl + routes.event.url)
            .send({
                name: 'testing'
            })
            .end(function(err, res) {
                assert.equal(res.status, 201);
                done();
            });
    });

    it('POST /event success message', function(done) {
        agent
            .post(appConfig.fullUrl + routes.event.url)
            .send({
                name: 'testing'
            })
            .end(function(err, res) {
                assert.equal(res.body.hasOwnProperty('status'), true);
                assert.equal(res.body.status, 'success');
                done();
            });
    });

    it('GET /event/:id 200 status', function(done) {
        // create an event
        agent
            .post(appConfig.fullUrl + routes.event.url)
            .send({
                name: 'testing'
            })
            .end(function(err, res) {
                var id = res.body._id;
                agent
                    .get(appConfig.fullUrl + routes.event.url + '/' + id)
                    .end(function(err, res) {
                        assert(res.status, 200);
                        done();
                    });
            });
    });
});
