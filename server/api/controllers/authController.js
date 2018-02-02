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

exports.userProfile = function(){
 
	var token = req.headers["x-access-token"];
				if (!token) return res.status(401).send({with: false, message: "no token provided."});

		jwt.verify(token, config.secret, function(err, decoded) {
				if (err) return res.status(500).send({ with: false, message: "failed to authenticate token."})

				res.status(200).send(decoded);
		});
})