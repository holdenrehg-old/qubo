var User = {
	get: function(req, res, next) {
        var people = req.db.get('user');
        people.find({}, {}, function(e, docs) {
            res.send(docs);
        });
    }
};

module.exports = User;