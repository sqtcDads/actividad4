import UserRepository from '../repositories/users.js';
import bcrypt from 'bcrypt'
import config from '../config/index.js';

class UserService {

    // loginUser = async (req, res) => {
    //     const { email, password } = req.body
    //     const hashedPassword = bcrypt.hashSync(password, config.SALT)
    //     const user = await UserRepository.loginUser(email, hashedPassword)

    //     res.json(user)
    // }

    registerUser = async (req, res) => {
        try {
            const { first_name, last_name, email, age, password } = req.body
            const hashedPassword = bcrypt.hashSync(password, 10);
            const userData = { first_name, last_name, email, age, password: hashedPassword }
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
                return res.redirect("/login/password")
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

}
export default new UserService()

