import express from "express";
import pg from "pg";
import { isLoggedIn } from "../controllers/authentication.js";

const app = express.Router();


// account route - protected page
app.get('/', isLoggedIn, (req, res) => {
    res.render("account.ejs", { name: req.user.displayName });
});

export default app;
