var Event = {
    Model: require('qubo').model('event'),

    get: function(req, res, next) {
        res.send(new Event.Model("Work").toJson());
    },

    post: function(req, res, next) {

    },

    put: function(req, res, next) {

    },

    delete: function(req, res, next) {

    }
};

module.exports = Event;
