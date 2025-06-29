import { ExtractJwt } from 'passport-jwt';
import { Strategy as JwtStrategy } from 'passport-jwt';
import passport from 'passport';
import UserRepository from '../repositories/users.js';
import config from '../config/index.js';

const cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};
const opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = config.MONGO_SALT;

async function verifyFunction(jwt_payload, done) {
    try {
        const user = await UserRepository.loginUser(jwt_payload.email);

        if (!user) {
            return done(null, false, { message: "Token inválido" });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}

export const initPassportJwt = () => {
    const strategy = new JwtStrategy(opts, verifyFunction);

    passport.use(strategy);
}