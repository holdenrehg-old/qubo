(function() {

	var Auth = {
		userExists: function(user, db, call) {
			var collection = db.get('user');
			console.log(user);
			collection.find({email: user.email}, {}, function(err, docs) {
				console.log(docs.length);
				if(docs.length > 0) {
					call(docs[0]);
				} else {
					call(false);
				}
			});
		}
	};

	module.exports = Auth;	
})();
