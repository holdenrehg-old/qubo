module.exports = Backbone.View.extend({

    form: null,

    initialize: function() {
        this.form = require('./template/signin.hbs');
        this.render();
    },

    render: function() {
        $(this.form()).appendTo(this.$el).fadeIn(200);
    },

    showError: function($el, message) {
        $el.addClass('error');
        $el.parent().siblings('.message').html(message);
    },

    clearError: function($el) {
        $el.removeClass('error');
        $el.parent().siblings('.message').html('');
    },

    events: {
        'click #submit-signin': 'submit',
        'focus input': 'focusInput'
    },

    submit: function(event) {
        event.preventDefault();

        var spinner = $('#spinner'),
            self = this;
        spinner.attr('src', '/images/ajax-loader.gif').show();
        $.post('/api/session', this.$el.find('#signinform').serialize())
            .done(function(data) {
                // log the user in
                App.navigate('feed', true);
            })
            .fail(function(res) {
                self.showError($('input[name=email]'), 'Incorrect email/password');
                self.showError($('input[name=password]'), 'Incorrect email/password');
                spinner.hide();
            });
    },

    focusInput: function(event) {
        this.clearError($(event.target));
    }
});
