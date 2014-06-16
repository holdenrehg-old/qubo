(function(_) {

	module.exports = Backbone.View.extend({
		
		template: undefined,
		username: undefined,

		initialize: function(options) {
			this.template = require('./template/sidenav.hbs');
			this.username = options.username;
			this.setup();
			this.render();
		},

		setup: function() {
			var self = this;
			_.each(this.data, function(obj) {
				self.events['click #' + obj.id] = obj.event;
			});
		},

		render: function() {
			console.log('render');
			this.$el.html(this.template(this.data));
		},

		events: {
			'click #sidenav-user': 'showProfile',
			'click #sidenav-feed': 'showFeed',
			'click #sidenav-explore': 'showExplore'
			'click #sidenav-settings': 'showSettings',
			'click #sidenav-logout': 'showLogout',
		},

		/**
		 *
		 */
		showProfile: function() {
			App.navigate(this.username, true);
		},

		/**
		 *
		 */
		showFeed: function() {
			App.navigate('feed', true);
		},

		/**
		 *
		 */
		showExplore: function() {
			// explore
		}

		/**
		 *
		 */
		showSettings: function() {
			App.navigate('settings', true);
		},

		/**
		 *
		 */
		showLogout: function() {
			App.navigate('logout', true);
		}
	});
})(
	require('underscore')
);
