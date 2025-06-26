import { Router } from "express";
import passport from 'passport';

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

viewsRouter.get("/profile", (req, res) => {
    res.render("profile")
})

viewsRouter.get("/failed", (req, res) => {
    res.render("profile")
})
viewsRouter.post('/login/password',
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true, failWithError: true }),
    function (req, res) {
        res.redirect('/profile');
    });

export default viewsRouter