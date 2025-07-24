import { Router } from "express";
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import UserService from "../services/users.js";

const viewsRouter = Router()

viewsRouter.get("/",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const user = req.user ? (req.user.toObject ? req.user.toObject() : req.user) : null;
        res.render("home", { user });
    });

viewsRouter.get("/logout", (req, res) => {
    res.clearCookie('jwt');
    res.redirect("/login");
});

viewsRouter.get("/login", UserService.redirectIfAuthenticated, (req, res) => {
    res.render("login")
})

viewsRouter.post("/register",
    UserService.checkEmail,
    UserService.registerUser
);
viewsRouter.get("/register", UserService.redirectIfAuthenticated, (req, res) => {
    res.render("register");
});

viewsRouter.get("/profile",
    passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
    (req, res) => {
        const plainUser = req.user.toObject ? req.user.toObject() : req.user;
        res.render("profile", { user: plainUser })
    })

viewsRouter.get("/failed", (req, res) => {
    res.render("profile")
})

viewsRouter.post('/login/password',
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true, failWithError: true }),
    function (req, res, next) {
        const user = req.user
        const token = jwt.sign({
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
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