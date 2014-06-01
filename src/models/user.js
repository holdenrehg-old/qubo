var Base = require('./base.js');

function User() {
	Base.call(this, []);
}
User.prototype = new Base();

module.exports = User;