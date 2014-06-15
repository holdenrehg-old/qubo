(function() {

	var Auth = {

		userExists: function(email, db, call) {
			var users = db.get('user');
			users.find({email: email}, {}, function(err, docs) {
				if(docs.length > 0) {
					call(docs[0]);
				} else {
					call(false);
				}
			});
		},

		cookieExists: function(token, db, call) {
			var sessions = db.get('session'),
				users = db.get('user'),
				self = this;

			sessions.find({token: token}, {}, function(err, docs) {
				if(docs.length > 0) {
					var user = docs[0].user;
					self.userExists(user.email, db, function(user) {
						if(user) {
							call(user);
						} else {
							sessions.remove({
								token: token
							});
							call(false);
						}
					});
				} else {
					call(false);
				}
			});
		}
	};

	module.exports = Auth;	
})();
