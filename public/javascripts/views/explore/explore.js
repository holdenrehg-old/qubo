(function(Base, Sidenav) {

	module.exports = Base.extend({

		headerTemplate: undefined,
		mainTemplate: undefined,

		/**
		 * @override
		 */
		setup: function() {
			this.headerTemplate = require('../general/template/header.hbs');
			this.mainTemplate = require('./template/main.hbs');
			this.useSidenav();
		},

		/**
		 * @override
		 */
		render: function() {
			this.$header.html(this.headerTemplate({
                title: 'explore'
            }));

			this.$main.html(this.mainTemplate());

			if(!this.$sidenav.html().length) {
                new Sidenav({
                    el: this.$sidenav,
                    username: this.currentUser.get('username')
                });
            }
		}
	});
})(
	require('../general/base.js'),
	require('../general/sidenav/sidenav.js')
);