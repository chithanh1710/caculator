const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

const html = fs.readFileSync("./index.html", "utf-8");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send(html);
});

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});
