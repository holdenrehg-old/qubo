define(['backbone', 'jquery'], function(Backbone, $) {
	
	return Backbone.Router.extend({

		routes: {
			'': 'index',
			'testing': 'testing'
		},

		index: function() {
			$('body').html('<h1>Home</h1> <a href="/testing">Testing</a>');
			console.log('initializing index route');
		},

		testing: function() {
			$('body').html('<h1>Testing Page</h1> <a href="/">Go Home</a>');
			console.log('initializing testing route');
		}
	});
});