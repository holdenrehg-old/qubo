(function(Base) {

    /**
     * @constructor
     */

    function Session() {
        Base.call(this, {
        	user: true,
        	token: true
    	});
    }
    Session.prototype = new Base();

    module.exports = Session;
})(require('qubo').model('base'));
