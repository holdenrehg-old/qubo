module.exports = Backbone.View.extend({

	form: null,

	initialize: function() {
		this.form = require('./template/signin.hbs');
		this.render();
	},

	render: function() {
		$(this.form()).appendTo(this.$el).fadeIn(200);
	}
});