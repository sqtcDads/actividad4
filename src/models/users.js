import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "../config/index.js";

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    age: { type: Number, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin"] },
});

userSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
