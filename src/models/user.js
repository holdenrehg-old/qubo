(function(Base, bcrypt) {

    /**
     * @constructor
     */

    function User() {
        Base.call(this, {
            firstName: true,
            lastName: true,
            password: true,
            email: true,
            username: true
        });

        this.collection = 'user';
    }
    User.prototype = new Base();

    /**
     * After the initial build call, check to see if passwords
     * need to be hashed
     *
     * @override
     */
    User.prototype.build = function(options, call) {
        var self = this;
        Base.prototype.build.call(self, options, function() {
            if (self.has('password')) {
                self.password = bcrypt.hashSync(self.password, bcrypt.genSaltSync());
                call(self);
            }
        });
    }

    module.exports = User;
})(require('qubo').model('base'), require('bcrypt'));
