"use strict";

const path = require("path");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0";

app.use(express.static(path.join(__dirname, "build")));
// App
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
