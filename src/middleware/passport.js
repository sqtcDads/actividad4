import passport from "passport";
import bcrypt from "bcrypt"
import config from '../config/index.js';
import UserRepository from '../repositories/users.js';
import { Strategy as LocalStrategy } from "passport-local";

async function verifyFunction(email, password, cb) {
    console.log("hola desde verify")
    try {
        const hashedPassword = bcrypt.hashSync(password, config.SALT);
        const user = await UserRepository.loginUser(email, hashedPassword);

        if (!user) {
            return cb(null, false, { message: "Incorrect email or password." });
        }
        return cb(null, user);
    } catch (error) {
        return cb(error);
    }
};

export const initPassport = () => {

    const strategy = new LocalStrategy(verifyFunction);

    passport.use(strategy);

}

