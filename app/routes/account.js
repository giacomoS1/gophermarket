import express from "express";
import { isLoggedIn } from "../controllers/authentication.js";

import pg from "pg";
const app = express.Router();


// account route - protected page
app.get('/', isLoggedIn, (req, res) => {
    res.render("account.ejs", { name: req.user.displayName });
});

export default app;