module.exports = Backbone.View.extend({
	
    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html('<h1>Are you in the right place?</h1><a href="/">Go Home</a>');
    }
});
