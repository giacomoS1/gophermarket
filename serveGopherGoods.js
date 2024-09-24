import express from "express";

const app = express();
// Port set here
const PORT = 3000;
// Sets destination for all ejs files
app.set('views', './app/views');


app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(PORT, () => {
  console.log(`Gopher is running at http://localhost:${PORT}/`);
}); 