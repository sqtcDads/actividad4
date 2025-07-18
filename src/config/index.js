import dotenv from "dotenv"
dotenv.config()

export default {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017",
    MONGO_SALT: Number(process.env.SALT) || 10,
    JWT_SECRET: process.env.JWT_SECRET || "miclaveultrasecreta123",
}
