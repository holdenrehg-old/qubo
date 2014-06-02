(function(qubo) {

    var Todo = {
        Model: qubo.model('todo'),

        get: function(req, res, next) {
            var todos = req.db.get('todo');
            todos.find({}, {}, function(e, docs) {
                res.send(docs);
            });
        },

        getTodo: function(req, res, next) {

        },

        post: function(req, res, next) {

        },

        put: function(req, res, next) {

        },

        delete: function(req, res, next) {

        }
    };

    module.exports = Todo;
})(require('qubo'));
