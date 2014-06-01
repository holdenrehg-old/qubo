var Base = require('./base.js');

function Todo() {
	Base.call(this, []);
}
Todo.prototype = new Base();

module.exports = Todo;