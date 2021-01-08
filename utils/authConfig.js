import passport from "passport";
const express = require("express");
const session = require("express-session");
const { v4: uuid } = require("uuid");
require("dotenv").config();

export const authConfig = (authStrategy) => {
    const DEV = process.env.NODE_ENV !== "production";

    const sessionConfig = {
        secret: process.env.APPLICATION_SECRET,
        cookie: {
            maxAge: 86400 * 1000,
            secure: DEV ? false : true
        },
        resave: false,
        saveUninitialized: true,
    };

    const app = express();
    app.use(session(sessionConfig));

    if (authStrategy) {
        passport.use(authStrategy);
        passport.serializeUser((user, done) => done(null, user));
        passport.deserializeUser((user, done) => done(null, user));
        app.use(passport.initialize());
        app.use(passport.session());
        console.log(authStrategy);
        console.log(passport.session());
    }

    return app;
}