(function(qubo) {

    var Session = qubo.model('session'),
        User = {
            Model: qubo.model('user'),

            get: function(req, res, next) {
                var people = req.db.get('user');
                people.find({}, {}, function(e, docs) {
                    res.send(docs);
                });
            },

            getUser: function(req, res, next) {
                res.send({
                    status: 'todo'
                });
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
                                new Session().build({
                                    obj: {
                                        user: user
                                    }
                                }, function(session) {
                                    if (session) {
                                        session.insert(req.db, function(err) {
                                            if (!err) {
                                                res.status(201);
                                                res.cookie('auth', session.token);
                                                res.send();
                                            } else {
                                                res.send({
                                                    status: 'error',
                                                    message: err
                                                });
                                            }
                                        });
                                    } else {
                                        res.send({
                                            status: 'error',
                                            message: 'Could not create session'
                                        });
                                    }
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
                    console.log('catch error');
                    console.log(err.message);
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
                var collection = req.db.get('user');
                collection.remove({
                    _id: req.params.id
                }, function(err, doc) {
                    if (!err) {
                        res.status(204);
                        res.send();
                    } else {
                        res.status(400);
                        res.send({
                            status: 'error',
                            message: err
                        });
                    }
                });
            }
        };

    module.exports = User;
})(require('qubo'));
