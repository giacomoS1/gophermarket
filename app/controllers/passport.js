import passport from "passport";
import "dotenv/config";
import {Strategy as GoogleStrategy} from "passport-google-oauth20"; // for google oauth

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

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  export default passport;