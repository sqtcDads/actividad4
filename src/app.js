import express from 'express';
import { createServer } from 'http';
import userRouter from './routes/users.js';
import viewsRouter from './routes/views.js';
import sessionRouter from './routes/session.js';
import bodyParser from 'body-parser'
import { engine } from 'express-handlebars'
import mongoose from 'mongoose'
import config from './config/index.js';
import { initPassport } from "./middleware/passportLocal.js"
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { initPassportJwt } from "./middleware/passportJwt.js"


const app = express()
const server = createServer(app)
const { PORT, MONGO_URI } = config

//hbs
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')

//Middleware
app.use(express.json())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cookieParser())
app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(passport.initialize())
app.use(passport.session())
initPassport()
initPassportJwt()
app.use("/", viewsRouter)
app.use("/api/users", userRouter)
app.use("/api/sessions", sessionRouter)

//endpoint
app.get('/', (req, res) => {
    res.render('home')
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

mongoose.connect(MONGO_URI, { dbName: "integrative_practice" })
    .then(() => console.log("mongodb conectado"))
    .catch((err) => {
        console.error({ error: err.message })
        process.exit(1)
    })