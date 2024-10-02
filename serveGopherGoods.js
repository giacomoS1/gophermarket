// Imports are packages that are used in a js file. We will be using something called ES6, which imports node modules a bit differently compared to old methods.
/* Example of old method: 
var express = require("express")
-- Please make sure that when you are learning node, that you use import, as using require will not work with our server.
*/
import express from "express";
import passport from "passport"; // for google oauth
import {Strategy as GoogleStrategy} from "passport-google-oauth20"; // for google oauth
import session from "express-session"; // for google oauth

// Imports below will be used for Routing pages
import browseRoute from "./app/routes/browse.js";


// This creates a variable called app, which will be used to call to our server. Use it to establish http requests
const app = express();
// Port set here
const PORT = 3000;

// configures express-session
app.use(session({
  secret: 'asdgasdgfsadgfdsgsdfdsgfagfdsgdsfgfdsgfsdsdf', // placeholder - not secure!
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set to true once using https
}));

// initializes passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// google oauth setup
passport.use(new GoogleStrategy({
  clientID: '994706186413-h03c8po5lklpnsp7dpmgl47ougg29rm4.apps.googleusercontent.com',
  clientSecret: '', // insert client secret here from discord before trying
  callbackURL: '/auth/google/callback',
  scope: ['profile', 'email']
}, (accessToken, refreshToken, profile, done) => {
  // saving user info to dababase can be done here
  done(null, profile) // passes use profile for now
}));

/* Static files are the local files that are going to be referenced ex:Images */
app.use(express.static('./css'))

app.use("/browse", browseRoute);
// Sets destination for all ejs files to the directory app/views.
// Ejs applications use something called a views folder to hold all the main html pages we plan to use throughout the website. They will be formatted nearly exactly like the basic html page.
app.set('views', './app/views');

/*This is the first, basic http request. We will be using the main http requests to make a CRUD app.
*/
app.get("/", (req, res) => {
/* req stands for request, res stands for response. Requests are used to ask for information from a user/create an input while responses are going to be used to send data to the user. This can range from certain lists of objects, to pull pages like the one below */
  res.render("index.ejs");

});

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

// account route - protected page
app.get('/account', isLoggedIn, (req, res) => {
  res.send(`<h1>Account<h1><p>Hello, ${req.user.displayName}</p><a href="/logout">Logout</a>`);
});

// logout route
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

// checks if user is authenticated
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

app.listen(PORT, () => {
  console.log(`Gopher is running at http://localhost:${PORT}/`);
}); 