(function(SigninForm, RegisterForm) {

    module.exports = Backbone.View.extend({

        headerTemplate: null,
        mainTemplate: null,
        $header: null,
        $main: null,
        $footer: null,

        initialize: function(options) {
            this.headerTemplate = require('./template/header.hbs');
            this.mainTemplate = require('./template/main.hbs');
            this.$header = options.dom.$header;
            this.$main = options.dom.$main;
            this.$footer = options.dom.$footer;
            this.render();
        },

        render: function() {
            this.$header.html(this.headerTemplate());
            this.$main.html(this.mainTemplate());
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
