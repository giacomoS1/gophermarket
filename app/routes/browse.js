import express from "express";
const app = express.Router();

app.get("/", (req,res) => {
    console.log("testingggg")
    res.render("browse.ejs")
});

// module.exports = app;
export default app;