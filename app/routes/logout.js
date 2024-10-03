import express from "express";

const app = express.Router();

// logout route
app.get('/', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

export default app;