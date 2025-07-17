import UserModel from "../models/users.js"

class UserRepository {

    loginUser = async (email) => {
        const user = await UserModel.findOne({ email }, "-__v -_id");
        return user
    }

    registerUser = async ({ first_name, last_name, email, age, password, cart, role }) => {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new Error('El email ya está registrado');
        }
        const newUser = await UserModel.create({ first_name, last_name, email, age, password, cart, role })
        return newUser
    }

    checkEmail = async (email) => {
        const user = await UserModel.findOne({ email });
        return user ? true : false;
    }
}

export default new UserRepository()