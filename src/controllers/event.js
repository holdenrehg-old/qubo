(function(_, qubo) {

    var Event = {
        Model: qubo.model('event'),

        get: function(req, res, next) {
            var collection = req.db.get('event');
            collection.find({}, {}, function(e, docs) {
                res.send(docs);
            });
        },

        getEvent: function(req, res, next) {
            var collection = req.db.get('event'),
                id = req.params.id;
            collection.find({_id: id}, {}, function(e, docs) {
                res.send(docs);
            });
        },

        post: function(req, res, next) {
            try {
                var collection = req.db.get('event');
                new Event.Model().build({
                    request: req,
                    strict: true
                }, function(event) {
                    collection.insert(event.obj(), function(err, doc) {
                        if (!err) {
                            res.status(201);
                            res.send({
                                status: 'success',
                                id: doc._id
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
            var collection = req.db.get('event');
            collection.remove({_id: req.params.id}, function(err, doc) {
                if(!err) {
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

    module.exports = Event;
})(require('underscore'), require('qubo'));
