(function(Base, Sidenav) {

	module.exports = Base.extend({

		/**
		 * @override
		 */
		setup: function() {

		},

		/**
		 * @override
		 */
		render: function() {
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
