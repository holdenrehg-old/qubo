(function(Base, uuid) {

    /**
     * @constructor
     */

    function Session() {
        Base.call(this, {
            user: true,
            token: true
        });

        this.collection = 'session';
    }
    Session.prototype = new Base();

    /**
     * @override
     */
    Session.prototype.build = function(options, call) {
        if(options.hasOwnProperty('obj')) {
            options.obj.token = uuid.v4();
        }
        Base.prototype.build.call(this, options, call);
    }

    /** 
     * @override
     */
    Session.prototype.insert = function(db, call) {
        var sessions = db.get(this.collection);
        console.log(this.obj());
        sessions.insert(this.obj(), function(err) {
            call(err);
        });
    };

    module.exports = Session;
})(require('qubo').model('base'), require('node-uuid'));
