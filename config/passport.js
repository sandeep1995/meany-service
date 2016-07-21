var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../models/user');
var config = require('./main');

module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  
    opts.secretOrKey = config.secret;
    
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){

        User.findOne({id: jwt_payload._id, role: jwt_payload.role}, function(err, user){
            if(err){
                return done(err, false);
            }
            if(user){

                done(null, user);
            }
            else{
                done(null, false);
            }
        });
    }));
};