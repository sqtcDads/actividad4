import passport from "passport";
import bcrypt from "bcrypt"
import UserRepository from '../repositories/users.js';
import { Strategy as LocalStrategy } from "passport-local";
import config from '../config/index.js';

async function verifyFunction(email, password, cb) {
    try {
        const user = await UserRepository.loginUser(email);
        if (!user) {
            return cb(null, false, { message: "Incorrect email or password." });
        }

        const plainHashed = bcrypt.hashSync(password, config.MONGO_SALT);
        // const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = user.password === plainHashed;

        if (!isMatch) {
            return cb(null, false, { message: "Incorrect email or password." });
        }
        return cb(null, user);
    } catch (error) {
        return cb(error);
    }
};

export const initPassport = () => {

    const strategy = new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        verifyFunction)
    passport.serializeUser(function (user, done) {
        done(null, user);

    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    passport.use(strategy);
}

