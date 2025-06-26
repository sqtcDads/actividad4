
import UserModel from "../models/users.js"

class UserRepository {

    loginUser = async (email, password) => {
        const user = await UserModel.findOne({ email, password }, "-password")
        return user
    }

    registerUser = async ({ email, password, firstName, lastName, role }) => {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new Error('El email ya está registrado');
        }
        const newUser = await UserModel.create({ email, password, firstName, lastName, role })
        return newUser
    }

}
export default new UserRepository()