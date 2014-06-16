module.exports = Backbone.Model.extend({

	routes: {
		session: '/api/session',
		user: '/api/user'
	},

	urlRoot: '',
	defaults: {
		email: undefined,
		username: undefined,
		firstName: undefined,
		lastName: undefined
	},

	/**
	 * @override
	 */
	fetch: function(options) {
		if(!this.get('id')) {
			this.urlRoot = this.routes.session;
		} else {
			this.urlRoot = this.routes.user;
		}
		Backbone.Model.prototype.fetch.call(this, options);
	}

});