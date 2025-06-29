import { Router } from "express";
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const viewsRouter = Router()

viewsRouter.get("/", (req, res) => {
    res.render("home")
})

viewsRouter.get("/login", (req, res) => {
    res.render("login")
})

viewsRouter.get("/register", (req, res) => {
    res.render("register")
})

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
        }, config.MONGO_SALT, { expiresIn: '2h' })
        res.cookie('jwt', token, {
            httpOnly: true
        })
        next()
    },
    function (req, res) {
        res.redirect('/profile');
    });

export default viewsRouter