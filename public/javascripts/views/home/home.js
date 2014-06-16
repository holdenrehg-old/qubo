(function(SigninForm, RegisterForm, Base) {

    module.exports = Base.extend({

        headerTemplate: null,
        mainTemplate: null,

        /**
         * @override
         */
        setup: function() {
            this.headerTemplate = require('../general/template/header.hbs');
            this.mainTemplate = require('./template/main.hbs');

            this.$el.removeClass('withsidenav');
            this.clear([
                this.$sidenav
            ]);
        },

        /**
         * @override
         */
        render: function() {
            this.$header.html(this.headerTemplate({
                title: 'qubo'
            }));
            this.$main.html(this.mainTemplate());
        },

        events: {
            "click #signin": "showSignin",
            "click #register": "showRegister"
        },

        showSignin: function(event) {
            new SigninForm({
                el: this.$main
            });
        },

        showRegister: function(event) {
            new RegisterForm({
                el: this.$main
            });
        }
    });
})(
    require('../general/form/signin/signin.js'),
    require('../general/form/register/register.js'),
    require('../general/base.js')
);
