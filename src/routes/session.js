import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import UserRepository from "../repositories/users.js";
import userRouter from "./users.js";

const sessionRouter = Router();

sessionRouter.post("/login",
    passport.authenticate('local', { session: false }),
    (req, res) => {
        const user = req.user;
        const token = jwt.sign(
            { email: user.email, role: user.role },
            config.JWT_SECRET,
            { expiresIn: "2h" }
        );
        res.cookie('jwt', token, { httpOnly: true });
        res.json({ status: "success", token });
    }
);

sessionRouter.get("/current",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const user = req.user.toObject ? req.user.toObject() : req.user
        delete user.password
        res.json({ status: "success", user })
    }
);

export default sessionRouter;