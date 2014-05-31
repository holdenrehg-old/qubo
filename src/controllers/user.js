var User = {
	Model: require('qubo').model('user'),

    get: function(req, res, next) {
        var people = req.db.get('user');
        people.find({}, {}, function(e, docs) {
            res.send(docs);
        });
    },

    post: function(req, res, next) {

    },

    put: function(req, res, next) {

    },

    delete: function(req, res, next) {

    }
};

module.exports = User;
