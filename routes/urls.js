import express from "express";
import { readUrls, writeUrls } from "../utils/fileHelper.js";

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


router.post("/", async (req, res) => {
  const { original } = req.body;

  if (!original) {
    return res.status(400).json({ error: "original URL is required" });
  }

  const urls = await readUrls();

  const newUrl = {
    id: urls.length ? urls[urls.length - 1].id + 1 : 1,
    original: original,
    code: Math.random().toString(36).slice(2, 8),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  urls.push(newUrl);
  await writeUrls(urls);

  res.status(201).json(newUrl);
});

export default router;