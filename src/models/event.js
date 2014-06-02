(function(Base) {

    /**
     * @constructor
     */

    function Event() {
        Base.call(this, {
            name: true
        });
    }
    Event.prototype = new Base();

    module.exports = Event;
})(require('qubo').model('base'));
