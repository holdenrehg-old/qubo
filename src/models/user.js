(function(Base, bcrypt) {

    /**
     * @constructor
     */

    function User() {
        Base.call(this, {
            firstName: true,
            lastName: true,
            password: true,
            confirm: false,
            email: true
        });
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
            // hash the password if given a password and confirm
            if (self.has('password') && self.has('confirm')) {
                if(self.password === self.confirm) {
                    delete self.confirm;
                    self.password = bcrypt.hashSync(self.password, bcrypt.genSaltSync());
                    call(self);
                } else {
                    throw "Password and confirm password do not match";
                }
            } else {
                call(self);
            }
        });
    }

    module.exports = User;
})(require('qubo').model('base'), require('bcrypt'));
