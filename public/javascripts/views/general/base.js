(function(_) {

	module.exports = Backbone.View.extend({

	    $header: undefined,
	    $main: undefined,
	    $footer: undefined,
	    $sidenav: undefined,
	    currentUser: undefined,
	    options: undefined,

	    initialize: function(options) {
	        // set vars
	        this.$header = options.dom.$header;
	        this.$main = options.dom.$main;
	        this.$footer = options.dom.$footer;
	        this.$sidenav = options.dom.$sidenav;
	        this.currentUser = options.currentUser;
	        this.options = options;

	        this.reset([
	        	this.$header,
	        	this.$main,
	        	this.$footer,
	        	this.$sidenav
        	]);
	        this.setup();
	        this.render();
	    },

	    setup: function() {},
	    render: function() {},

	    /**
	     * Hides and clears each element from the DOM by adding display none
	     *
	     * @param $arr {array}
	     */
	    clear: function($arr) {
	    	_.each($arr, function($el) {
	    		$el.html('');
	    		$el.addClass('none');
	    	});
	    },

	    /**
	     * Resets element to show
	     *
	     * @param $arr {array}
	     */
	    reset: function($arr) {
	    	_.each($arr, function($el) {
	    		$el.removeClass('none');
	    	});
	    }
	});
})(
	require('underscore')
);

