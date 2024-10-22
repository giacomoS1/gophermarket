import express from "express";
const app = express.Router();



app.get("/", (req,res) => {
    console.log("listing")
    res.render("listing.ejs")
});

// module.exports = app;
export default app;
