import express from "express";
import pg from "pg";
const app = express.Router();



app.get("/", (req,res) => {
    console.log("testingggg")
    res.render("browse.ejs")
});

// module.exports = app;
export default app;