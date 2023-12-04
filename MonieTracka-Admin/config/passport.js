var passport = require('passport');
var passportJWT = require('passport-jwt');
var JwtStrategy = passportJWT.Strategy;
var ExtractJwt = passportJWT.ExtractJwt;
var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET; 

var LocalStrategy = require('passport-local').Strategy;
const db  = require('../database/db');
const helpers = require('./helpers');

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {

    try
    {
        
        if (jwt_payload.admin != 1) {
            
            var checkToken = await db.Oauth.findOne({
                where: {
                    id: jwt_payload.id,
                    email: jwt_payload.email,
                    iat: jwt_payload.iat,
                    exp: jwt_payload.exp,
                }
            });
        
            if (!checkToken) {
                
                // throw new Error({status: "ERROR", message: "Unauthorized", code: 401});
                return done({status: "ERROR", message: "Unauthorized", code: 401}, false);
            }
    
            var userInfo = await db.User.findOne({ where: { id: jwt_payload.id } });
            
            if(!userInfo) {
                return done({status: "ERROR", message: "Unauthorized", code: 401}, false);
            }
    
            return done(null, userInfo);
    
        } 
        else {
            
            var checkToken = await db.Oauth.findOne({
                where: {
                    id: jwt_payload.id,
                    email: jwt_payload.email,
                    iat: jwt_payload.iat,
                    exp: jwt_payload.exp,
                }
            });
        

            if (!checkToken) {
                console.log("11");
                return done({status: "ERROR", message: "Unauthorized", code: 401}, false);
            }

            var adminInfo = await db.Admin.findOne({ where: { id: jwt_payload.id } });
            
            if(!adminInfo) {
                return done({status: "ERROR", message: "Unauthorized", code: 401}, false);
            }

            return done(null, adminInfo);
    
        }
    }
    catch(error)
    {
        return done({status: "ERROR", message: "Unauthorized", code: 500}, false)
    }
}));

function customErrorHandler(err, req, res, next) {
    
    const errorResponse = {
      message: 'You are Unauthorized to perform this operation!',
      code: 401 
    };

    return res.status(401).json(helpers.sendError(errorResponse.message, errorResponse.code));
};


module.exports = {
    customErrorHandler
};