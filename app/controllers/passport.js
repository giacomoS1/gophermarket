import passport from "passport";
import "dotenv/config";
import pool from "../database/config.js";

import {Strategy as GoogleStrategy} from "passport-google-oauth20"; // for google oauth


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

      const userField = await pool.query(
        'SELECT * FROM users WHERE email = $1', [email] // grabs row where the users email exists (if it does at all)
      );
      if (userField.rows.length === 0) {  // checks to see if user actually existed or not
        const newUser = await pool.query(
          'INSERT INTO users (email, first_name, last_name) VALUES ($1, $2, $3) RETURNING *', [email, firstName, lastName] // inserts new user info
        );
        console.log("New user created:", newUser.rows[0]); 
        done(null, newUser.rows[0]); // returns user, null signifies that there wasn't an error here
      } else {
        console.log("User already exists:", userField.rows[0]);
        done(null, userField.rows[0]);
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