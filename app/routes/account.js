import express from "express";
import { isLoggedIn } from "../controllers/authentication.js";
import { addProduct } from "../database/productService.js";
import bodyParser from 'body-parser';

const app = express.Router();

// parses url bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// account route - protected page
app.get('/', isLoggedIn, (req, res) => {
    res.render("account.ejs", { name: req.user.displayName, logout: false });
});

// logout route
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    });
    res.render("account.ejs", { logout: true });
});

// route to handle product listing form submission
app.post('/list-product', isLoggedIn, async (req, res) => {
    const { productName, price } = req.body;
    console.log(req)
    try {
        await addProduct(productName, price, req.user.user_id);
        res.redirect('/account');
    } catch (err) {
        console.error("Error listing product", err);
        res.status(500).send("Internal Server Error");
    }
});

export default app;