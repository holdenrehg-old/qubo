(function(Base) {

    /**
     * @constructor
     */

    function Event() {
        Base.call(this, {
            name: true
        });

        this.collection = 'event';
    }
    Event.prototype = new Base();

    module.exports = Event;
})(require('qubo').model('base'));
