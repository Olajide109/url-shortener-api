import express from "express";

import urlRoutes from "./routes/urls.js";

const app =  express();

const PORT = 3000;

app.use("/urls", urlRoutes);

app.get("/", (req, res) => {
  res.send("URL Shortener is working");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

