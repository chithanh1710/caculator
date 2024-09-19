const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const html = fs.readFileSync("./index.html", "utf-8");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send(html);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
