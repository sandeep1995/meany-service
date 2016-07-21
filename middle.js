var jwt = require('jsonwebtoken');

var config = require('./config/main');

module.exports = {
	auth: function (whom) {
		return function (req, res, next) {
			if (typeof whom == "string") {
			// Find jwt from the request header
			console.log(req.headers);
			var token = req.headers.authorization || '';
			if (token == '') {
				return res.json({
					error: true,
					message: "You are unauthorized"
				})
			}
			jwt.verify(token, function(err, payload){
				if(err)
					res.redirect('/');
				else if ( payload.role == whom)
					next();
				else
					res.redirect('/');	
			});
			}
		}
	}
};