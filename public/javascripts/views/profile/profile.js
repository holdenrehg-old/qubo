(function(Base, Sidenav) {

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
			if(!this.$sidenav.html().length) {
                new Sidenav({
                    el: this.$sidenav,
                    username: this.currentUser.get('username')
                });
            }
		},

		events: {
		}
	});
})(
	require('../general/base.js'),
	require('../general/sidenav/sidenav.js')
);