var Base = require('./base.js');

function Session() {
    Base.call(this, []);
}
Session.prototype = new Base();

module.exports = Session;
