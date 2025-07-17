import { Router } from "express";
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import UserService from "../services/users.js";

const viewsRouter = Router()

viewsRouter.get("/", (req, res) => {
    res.render("home")
})

viewsRouter.get("/login", (req, res) => {
    res.render("login")
})

viewsRouter.post("/register",
    UserService.checkEmail,
    UserService.registerUser
);
viewsRouter.get("/register", (req, res) => {
    res.render("register");
});

viewsRouter.post("/register/new",
    (req, res, next) => {
        const email = req.body

    },
    (req, res, next) => { },
    (req, res) => { },
)

viewsRouter.get("/profile", passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
    const plainUser = req.user.toObject ? req.user.toObject() : req.user;
    res.render("profile", { user: plainUser })
})

viewsRouter.get("/failed", (req, res) => {
    res.render("profile")
})

viewsRouter.post('/login/password',
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true, failWithError: true }),
    function (req, res, next) {
        const user = req.user;
        const token = jwt.sign({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        }, config.JWT_SECRET, { expiresIn: '2h' })
        res.cookie('jwt', token, {
            httpOnly: true
        })
        next()
    },
    function (req, res) {
        res.redirect('/profile');
    });

export default viewsRouter