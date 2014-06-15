module.exports = Backbone.View.extend({

    form: null,

    initialize: function() {
        this.form = require('./template/register.hbs');
        this.render();
    },

    render: function() {
        $(this.form()).appendTo(this.$el).fadeIn(200);
    },

    isValid: function() {
        var formArray = this.$el.find('#registerform').serializeArray(),
            inputs = {},
            valid = true;
        formArray.forEach(function(obj) {
            inputs[obj.name] = obj.value;
        });
        if (inputs.email === '') {
            this.showError($('input[name=email]'), 'Email is required');
            valid = false;
        }
        if (inputs.firstName === '') {
            this.showError($('input[name=firstName]'), 'First name is required');
            valid = false;
        }
        if (inputs.lastName === '') {
            this.showError($('input[name=lastName]'), 'Last name is required');
            valid = false;
        }
        if (inputs.password === '') {
            this.showError($('input[name=password]'), 'Password is required');
            valid = false;
        }
        if (inputs.confirm === '') {
            this.showError($('input[name=confirm]'), 'Confirm password is required');
            valid = false;
        }
        if (inputs.confirm !== inputs.password) {
            this.showError($('input[name=confirm]'), 'Passwords do not match');
            this.showError($('input[name=password]'), 'Passwords do not match');
            valid = false;
        }

        return valid;
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
        'click #submit-register': 'submit',
        'focus input': 'focusInput'
    },

    submit: function(event) {
        event.preventDefault();

        if (this.isValid()) {
        	var spinner = $('#spinner');
        	spinner.attr('src', '/images/ajax-loader.gif').show();
            $.post('/api/user', this.$el.find('#registerform').serialize())
                .done(function(data) {
                    console.log(data);
                    // log the user in
                    App.navigate('feed', true);
                })
                .fail(function(res) {
                    console.log(res.responseJSON);
                    spinner.hide();
                });
        }
    },

    focusInput: function(event) {
        this.clearError($(event.target));
    }
});
