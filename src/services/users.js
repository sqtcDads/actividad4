import UserRepository from '../repositories/users.js';
import bcrypt from 'bcrypt'
import passport from 'passport';
import config from '../config/index.js';

class UserService {

    registerUser = async (req, res) => {
        try {
            const { first_name, last_name, email, age, password } = req.body
            const userData = { first_name, last_name, email, age, password }
            const newUser = await UserRepository.registerUser(userData)
            return res.redirect("/login")
        } catch (error) {
            return res.redirect("/register")
        }
    }

    checkEmail = async (req, res, next) => {
        try {
            const user = req.body
            const isRegistered = await UserRepository.checkEmail(user.email)
            if (isRegistered) {
                return res.redirect("/register")
            }
            next()
        } catch (error) {
            res.redirect("/register")
        }
    }

    validateLogin = (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.redirect("/login");
        }
        next();
    }

    authenticate = passport.authenticate('jwt', { session: false });
    validateAdmin = (req, res, next) => {
        if (req.user.role === "admin") {
            next();
        } else {
            res.status(403).json({ message: "Forbidden" });
        }
    }

    redirectIfAuthenticated = (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (user) => {
            if (user) {
                return res.redirect('/profile');
            }
            next();
        })(req, res, next);

    }
}

export default new UserService()

