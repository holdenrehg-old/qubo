(function(Base, Sidenav) {

    module.exports = Base.extend({

        headerTemplate: undefined,
        sidenavTemplate: undefined,

        /**
         * @override
         */
        setup: function() {
            this.headerTemplate = require('../general/template/header.hbs');
            this.$el.addClass('withsidenav');
        },

        /**
         * @override
         */
        render: function() {
            this.$header.html(this.headerTemplate({
                title: 'recent'
            }));
            this.$main.html('');
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

