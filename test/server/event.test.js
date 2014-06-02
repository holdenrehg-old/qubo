describe('Event API', function() {
    var assert,
        agent,
        qubo,
        routes,
        appConfig,
        testEvent;

    before(function() {
        assert = require('assert');
        agent = require('superagent').agent();
        qubo = require('qubo');
        routes = qubo.routeConfig();
        appConfig = qubo.appConfig();
        testEvent = {
            name: 'testing'
        };

        // create test event
        agent
            .post(appConfig.fullUrl + routes.event.url)
            .send(testEvent)
            .end(function(err, res) {
                testEvent.id = res.body.id;
            });
    });

    it('GET /event 200 status', function(done) {
        agent
            .get(appConfig.fullUrl + routes.event.url)
            .end(function(err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });


    it('GET /event/:id 200 status', function(done) {
        // create an event
        agent
            .get(appConfig.fullUrl + routes.event.url + '/' + testEvent.id)
            .end(function(err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });

    it('GET /event/:id 200 correct data', function(done) {
        // create an event
        agent
            .get(appConfig.fullUrl + routes.event.url + '/' + testEvent.id)
            .end(function(err, res) {
                assert.equal(res.body[0].name, testEvent.name);
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

    it('POST /event missing parameters should throw error', function(done) {
        agent
            .post(appConfig.fullUrl + routes.event.url)
            .end(function(err, res) {
                assert.equal(res.body.hasOwnProperty('status'), true);
                assert.equal(res.body.status, 'error');
                done();
            });
    });
});
