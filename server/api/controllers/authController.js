exports.login = function(user, password){
	user.find({username: user.username}, function(err, usr){
		if(err) throw err;

		res.json
	});

};

exports.signout = function(){

};

exports.ensureAuthRole = function(){

}