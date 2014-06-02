(function(qubo) {

    var User = {
        Model: qubo.model('user'),

        get: function(req, res, next) {
            var people = req.db.get('user');
            people.find({}, {}, function(e, docs) {
                res.send(docs);
            });
        },

        getUser: function(req, res, next) {

        },

        post: function(req, res, next) {
            try {
                var people = req.db.get('user');
                new User.Model().build({
                    request: req,
                    strict: true
                }, function(user) {
                    people.insert(user.obj(), function(err) {
                        if (!err) {
                            res.status(201);
                            res.send({
                                status: 'success'
                            });
                        } else {
                            res.status(400);
                            res.send({
                                status: 'error',
                                message: err
                            });
                        }
                    });
                });
            } catch (err) {
                res.status(400);
                res.send({
                    status: 'error',
                    message: err
                });
            }
        },

        put: function(req, res, next) {

        },

        delete: function(req, res, next) {

        }
    };

    module.exports = User;
})(require('qubo'));
