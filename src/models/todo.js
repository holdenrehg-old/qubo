(function(Base) {

    /**
     * @constructor
     */

    function Todo() {
        Base.call(this, {});
    }
    Todo.prototype = new Base();

    module.exports = Todo;
})(require('qubo').model('base'));
