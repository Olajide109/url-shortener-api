import express from "express";
import { readUrls } from "../utils/fileHelper.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const urls = await readUrls();
  res.status(200).json(urls);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const urls = await readUrls();
  const found = urls.find((u) => u.id === id);

  if (!found) {
    return res.status(404).json({ error: "URL not found" });
  }

  res.status(200).json(found);
});

export default router;