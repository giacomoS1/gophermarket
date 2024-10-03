import express from "express";
import passport from "passport"; // for google oauth
import 'dotenv/config';
import {Strategy as GoogleStrategy} from "passport-google-oauth20"; // for google oauth

const app = express.Router();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// google oauth setup
passport.use(new GoogleStrategy({
  clientID: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
  scope: ['profile', 'email']
}, (accessToken, refreshToken, profile, done) => {
  // saving user info to dababase can be done here
  done(null, profile) // passes use profile for now
}));

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
    res.redirect('/');
}

export default app;
  