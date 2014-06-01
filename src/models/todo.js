var Base = require('./base.js');

/**
 * @constructor
 */

function Todo() {
    Base.call(this, []);
}
Todo.prototype = new Base();

module.exports = Todo;
