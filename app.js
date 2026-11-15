import express from "express";
import urlRoutes from "./routes/urls.js";
import { readUrls } from "./utils/fileHelper.js";

const app =  express();

const PORT = 3000;

app.use(express.json());

app.use("/urls", urlRoutes);

app.get("/:shortCode", async (req, res) => {
  const urls = await readUrls();
  const found = urls.find((url) => url.shortCode === req.params.shortCode);

  if (!found) {
    return res.status(404).json({ error: "URL not found" });
  }

  res.redirect(found.originalUrl);
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

