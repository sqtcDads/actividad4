import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import UserRepository from "../repositories/users.js";

const sessionRouter = Router();

sessionRouter.post("/login",
    passport.authenticate('local', { session: false }),
    (req, res) => {
        const user = req.user;
        const token = jwt.sign(
            { email: user.email, role: user.role },
            config.JWT_SECRET,
            { expiresIn: "2h" },
        );
        res.cookie('jwt', token, { httpOnly: true });
        res.json({ status: "success", token });
    }
);

sessionRouter.get("/current",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({ status: "success", user: req.user });
    }
);

export default sessionRouter;