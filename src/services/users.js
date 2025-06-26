import UserRepository from '../repositories/users.js';
import bcrypt from 'bcrypt'
import config from '../config/index.js';

class UserService {

    loginUser = async (req, res) => {
        const { email, password } = req.body //destructuring
        const hashedPassword = bcrypt.hashSync(password, config.SALT)
        const user = await UserRepository.loginUser(email, hashedPassword)
        console.log(hashedPassword)
        res.json(user)
    }

    registerUser = async (req, res) => {
        const user = req.body
        const newUser = await UserRepository.registerUser(user)
        res.json(newUser)
        console.log(user)
    }

}
export default new UserService()

