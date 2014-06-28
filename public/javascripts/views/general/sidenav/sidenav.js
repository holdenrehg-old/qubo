(function(_) {
	"use strict";

	/**
     * Sidenav
     * @augments Backbone.View
     * @constructor
     * @name Sidenav
     */
	module.exports = Backbone.View.extend(/** @lends Sidenav.prototype */ {

		/**
		 * Handlebars template for the sidenav
		 * @type {function}
		 * @memberof! Sidenav
		 */
		template: undefined,

		/**
		 * Username of the current user for the "me" link in the sidenav
		 * @type {string}
		 * @memberof! Sidenav
		 */
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
			'click #sidenav-explore': 'showExplore',
			'click #sidenav-settings': 'showSettings',
			'click #sidenav-logout': 'showLogout'
		},

		/**
		 * Navigate to profile route
		 * @private
		 */
		showProfile: function() {
			App.navigate(this.username, true);
		},

		/**
		 * Navigate to feed route
		 * @private
		 */
		showFeed: function() {
			App.navigate('feed', true);
		},

		/**
		 * Navigate to explore route
		 * @private
		 */
		showExplore: function() {
			App.navigate('explore', true);
		},

		/**
		 * Navigate to settings route
		 * @private
		 */
		showSettings: function() {
			App.navigate('settings', true);
		},

		/**
		 * Navigate to logout route
		 * @private
		 */
		showLogout: function() {
			App.navigate('logout', true);
		}
	});
})(
	require('underscore')
);
