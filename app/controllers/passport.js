import passport from "passport";
import "dotenv/config";
import {Strategy as GoogleStrategy} from "passport-google-oauth20"; // for google oauth
import { findUserByEmail, createUser } from "../database/userService.js";


// google oauth setup
passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ['profile', 'email']
  }, async (accessToken, refreshToken, profile, done) => { // waits for information to be fetched
    try {
      const email = profile.emails[0].value;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName; // retrieves email, first name, and last name from google auth

      const user = await findUserByEmail(email);
      if (!user) {  // checks to see if user actually existed or not
        const newUser = await createUser(email, firstName, lastname);
        console.log("New user created:", newUser); 
        done(null, newUser); // returns user, null signifies that there wasn't an error here
      } else {
        console.log("User already exists:", user);
        done(null, user);
      }
    } catch (err) {
      console.error("Error saving user to the database", err);
      done(err, null);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  export default passport;