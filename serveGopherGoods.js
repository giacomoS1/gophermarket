// Imports are packages that are used in a js file. We will be using something called ES6, which imports node modules a bit differently compared to old methods.
/* Example of old method: 
var express = require("express")
-- Please make sure that when you are learning node, that you use import, as using require will not work with our server.
*/
import express from "express";


// Imports below will be used for Routing pages
import browseRoute from "./app/routes/browse.js";


// This creates a variable called app, which will be used to call to our server. Use it to establish http requests
const app = express();
// Port set here
const PORT = 3000;

/* Static files are the local files that are going to be referenced ex:Images */
app.use(express.static('./css'))

app.use("/browse", browseRoute);
// Sets destination for all ejs files to the directory app/views.
// Ejs applications use something called a views folder to hold all the main html pages we plan to use throughout the website. They will be formatted nearly exactly like the basic html page.
app.set('views', './app/views');

/*This is the first, basic http request. We will be using the main http requests to make a CRUD app.
*/
app.get("/", (req, res) => {
/* req stands for request, res stands for response. Requests are used to ask for information from a user/create an input while responses are going to be used to send data to the user. This can range from certain lists of objects, to pull pages like the one below */
  res.render("index.ejs");

});

app.get("/account", (req,res) => {

})

app.listen(PORT, () => {
  console.log(`Gopher is running at http://localhost:${PORT}/`);
}); 