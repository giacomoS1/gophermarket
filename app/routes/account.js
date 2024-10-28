import express from "express";
import { isLoggedIn } from "../controllers/authentication.js";

const app = express.Router();


// account route - protected page
app.get('/', isLoggedIn, (req, res) => {
    console.log(req);
    res.render("account.ejs", { name: req.user.displayName, logout: false});
});


// logout route
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    });
    res.render("account.ejs", {logout: true})
});

export default app;