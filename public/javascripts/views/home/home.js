(function(SigninForm, RegisterForm) {

    module.exports = Backbone.View.extend({

        header: null,
        main: null,

        initialize: function() {
            this.header = require('./template/header.hbs');
            this.main = require('./template/main.hbs');
            this.render();
        },

        render: function() {
            this.$el.html(this.header() + this.main());
        },

        events: {
            "click #signin": "showSignin",
            "click #register": "showRegister"
        },

        showSignin: function(event) {
        	new SigninForm({
        		el: this.$el
        	});
        },

        showRegister: function(event) {
            new RegisterForm({
                el: this.$el
            });
        }
    });
})(require('../general/form/signin/signin.js'), require('../general/form/register/register.js'));
