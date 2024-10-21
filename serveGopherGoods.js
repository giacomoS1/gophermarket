// Imports are packages that are used in a js file. We will be using something called ES6, which imports node modules a bit differently compared to old methods.
/* Example of old method: 
var express = require("express")
-- Please make sure that when you are learning node, that you use import, as using require will not work with our server.
*/
import express from "express";
import passport from "./app/controllers/passport.js";
import session from "express-session";
import "dotenv/config";

// Imports below will be used for Routing pages
import authRoute from "./app/controllers/authentication.js";
import browseRoute from "./app/routes/browse.js";
import accountRoute from "./app/routes/account.js";
import logoutRoute from "./app/routes/logout.js";


const app = express();
// Port set here
const PORT = 3000;

// configures express-session, which allows persistence of data between http requests (such as a login state) through the use of cookies
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set to true once using https
}));

// initializes passport
app.use(passport.initialize());
app.use(passport.session());

/* Static files are the local files that are going to be referenced ex:Images */
app.use(express.static('./css'))

app.use("/logout", logoutRoute);
app.use("/auth", authRoute);
app.use("/browse", browseRoute);
app.use("/account", accountRoute);

import upload from "./app/controllers/responsiveImg.js";
app.use("/upload", upload);
// Sets destination for all ejs files to the directory app/views.
// Ejs applications use something called a views folder to hold all the main html pages we plan to use throughout the website. They will be formatted nearly exactly like the basic html page.
app.set('views', './app/views');

/*This is the first, basic http request. We will be using the main http requests to make a CRUD app.
*/
app.get("/", (req, res) => {
/* req stands for request, res stands for response. Requests are used to ask for information from a user/create an input while responses are going to be used to send data to the user. This can range from certain lists of objects, to pull pages like the one below */
  res.render("index.ejs");

});

app.listen(PORT, () => {
  console.log(`Gopher is running at http://localhost:${PORT}/`);
}); 