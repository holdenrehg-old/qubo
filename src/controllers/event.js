var Event = {
	Model: require('qubo').model('event'),

	get: function(req, res, next) {
		res.send(new Event.Model("Work").toJson());
	}
};

module.exports = Event;