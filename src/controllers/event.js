var Event = {
    Model: require('qubo').model('event'),

    get: function(req, res, next) {
        var events = req.db.get('event');
        events.find({}, {}, function(e, docs) {
            res.send(docs);
        });
    },

    post: function(req, res, next) {
        try {
            var events = req.db.get('event'),
                event = new Event.Model().build(req);
            events.insert(event.obj(), function(err) {
                if (!err) {
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
        } catch (err) {
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
