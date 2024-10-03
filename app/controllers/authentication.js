import express from "express";
import passport from "./passport.js";

const app = express.Router();

// google oauth login route
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// google oauth callback route
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/'}),
    (req, res) => {
        // successful authentication
        res.redirect('/account');
    }
);

// logout route
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

// checks if a user is authenticated
export function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/google');
}

export default app;
  