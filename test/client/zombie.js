var Browser = require('zombie'),
    browser = new Browser(),
    assert = require('assert'),
    qubo = require('qubo');

describe('Zombie Test', function() {
    it('Headless Browser', function(done) {
        browser.visit('http://localhost:3000', function() {
            assert.ok(browser.success);
            assert.equal(browser.text('title'), qubo.appConfig().title);
            done();
        });
    });
});
