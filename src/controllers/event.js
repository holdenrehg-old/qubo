(function(_, qubo) {

    var Event = {
        Model: qubo.model('event'),

        get: function(req, res, next) {
            var collection = req.db.get('event');
            collection.find({}, {}, function(e, docs) {
                res.send(docs);
            });
        },

        post: function(req, res, next) {
            try {
                var collection = req.db.get('event'),
                    event = new Event.Model().build({
                        request: req,
                        strict: true
                    });
                collection.insert(event.obj(), function(err) {
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

    module.exports = Event;
})(require('underscore'), require('qubo'));
