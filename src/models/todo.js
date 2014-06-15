(function(Base) {

    /**
     * @constructor
     */

    function Todo() {
        Base.call(this, {});

        this.collection = 'todo';
    }
    Todo.prototype = new Base();

    module.exports = Todo;
})(require('qubo').model('base'));
