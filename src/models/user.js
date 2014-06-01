var Base = require('./base.js');

/**
 * @constructor
 */

function User() {
    Base.call(this, []);
}
User.prototype = new Base();

module.exports = User;
