var Session = {
    Model: require('qubo').model('session'),

    get: function(req, res, next) {
    	var sessions = req.db.get('session');
        sessions.find({}, {}, function(e, docs) {
            res.send(docs);
        });
    },

    post: function(req, res, next) {
    
    },
    
    delete: function(req, res, next) {
    
    }
};

module.exports = Session;
