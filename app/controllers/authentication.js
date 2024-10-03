import express from "express";
import passport from "./passport.js";

const app = express.Router();

// google oauth login route
app.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// google oauth callback route
app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/'}),
    (req, res) => {
        // successful authentication
        res.redirect('/account');
    }
);

// checks if a user is authenticated
export function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/google');
}

export default app;
  