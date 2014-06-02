(function(qubo, uuid, cookie) {

    var auth = qubo.util('auth'),
        User = qubo.model('user'),
        Session = {
            Model: qubo.model('session'),

            get: function(req, res, next) {
                var sessions = req.db.get('session');
                sessions.find({}, {}, function(e, docs) {
                    res.send(docs);
                });
            },

            post: function(req, res, next) {
                try {
                    var collection = req.db.get('session');
                    new User().build({
                        request: req
                    }, function(user) {
                        auth.userExists(user, req.db, function(user) {
                            if (user) {
                                collection.insert({
                                    user: user._id,
                                    token: cookie.sign(uuid.v4(), '123454321')
                                }, function(err) {
                                    if (!err) {
                                        res.status(201);
                                        res.send({
                                            status: 'success'
                                        });
                                    } else {
                                        res.send({
                                            status: 'error',
                                            message: err
                                        });
                                    }
                                });
                            } else {
                                res.status(400);
                                res.send({
                                    status: 'error',
                                    message: 'That user does not exist'
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

            delete: function(req, res, next) {

            }
        };

    module.exports = Session;
})(require('qubo'), require('node-uuid'), require('cookie-signature'));
