var Base = require('./base.js');

/**
 * @constructor
 */

function Event() {
    Base.call(this, [
        'name'
    ]);
}
Event.prototype = new Base();

module.exports = Event;
