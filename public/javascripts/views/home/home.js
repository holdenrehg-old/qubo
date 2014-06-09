module.exports = Backbone.View.extend({
	
	header: null,
	main: null,

	initialize: function() {
		this.header = require('./template/header.hbs');
		this.main = require('./template/main.hbs');
		this.render(); 
	},

	render: function() {
		this.$el.html(this.header() + this.main());
	}
});