(function(qubo, cookie, bcrypt) {

    var auth = qubo.util('auth'),
        User = qubo.model('user'),
        Session = {
            Model: qubo.model('session'),

            get: function(req, res, next) {
                var sessions = req.db.get('session'),
                    cookies = req.parseCookies();
                if (cookies.auth) {
                    auth.cookieExists(cookies.auth, req.db, function(user) {
                        if (user) {
                            res.status(200);
                            res.send(user);
                        } else {
                            res.status(401);
                            res.send();
                        }
                    });
                } else {
                    res.status(401);
                    res.send();
                }
            },

            post: function(req, res, next) {
                try {
                    auth.userExists(req.param('email'), req.db, function(user) {
                        if (user && bcrypt.compareSync(req.param('password'), user.password)) {
                            new Session.Model().build({
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
                                    res.status(400);
                                    res.send({
                                        status: 'error',
                                        message: 'Could not create session'
                                    });
                                }
                            });
                        } else {
                            res.status(400);
                            res.send();
                        }
                    });
                } catch (err) {
                    res.status(400);
                    res.send();
                }
            },

            delete: function(req, res, next) {
                var sessions = req.db.get('session'),
                    cookies = req.parseCookies();

                if (cookies.auth) {
                    sessions.remove({
                        token: cookies.auth
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
                } else {
                    res.status(200);
                    res.send();
                }
            }
        };

    module.exports = Session;
})(require('qubo'), require('cookie-signature'), require('bcrypt'));
