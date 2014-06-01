var Base = require('./base.js');

/**
 * @constructor
 */

function Session() {
    Base.call(this, []);
}
Session.prototype = new Base();

module.exports = Session;
