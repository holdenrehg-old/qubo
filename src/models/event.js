function Event(name) {
	this.name = name;
}

Event.prototype.toJson = function() {
	return "{\"name\": \"" + this.name + "\"}";
};

module.exports = Event;