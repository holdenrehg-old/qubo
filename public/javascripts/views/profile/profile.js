(function(Base) {

	module.exports = Base.extend({

		mainTemplate: undefined,
		sidenavTemplate: undefined,
		user: undefined,

		setup: function() {
			this.mainTemplate = require('./template/main.hbs');
			this.user = this.options.user;

			this.$el.addClass('withsidenav');
			this.clear([
				this.$header
			]);
		},

		render: function() {
			this.$main.html(this.mainTemplate(this.user.toJSON()));
		}
	});
})(
	require('../general/base.js')
);