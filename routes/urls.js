import express from "express";
import { readUrls, writeUrls } from "../utils/fileHelper.js";
import { validateResource } from "../utils/validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const urls = await readUrls();
  res.status(200).json(urls);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: "ID must be a positive integer" });
  }

  const urls = await readUrls();
  const found = urls.find((url) => url.id === id);

  if (!found) {
    return res.status(404).json({ error: "URL not found" });
  }

  return res.status(200).json(found);
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: "ID must be a positive integer" });
  }

  const validationError = validateResource(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const urls = await readUrls();
  const index = urls.findIndex((url) => url.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "URL not found" });
  }

  urls[index] = {
    ...urls[index],
    originalUrl: req.body.originalUrl,
    updatedAt: new Date().toISOString(),
  };

  await writeUrls(urls);
  return res.status(200).json(urls[index]);
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: "ID must be a positive integer" });
  }

  const urls = await readUrls();
  const index = urls.findIndex((url) => url.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "URL not found" });
  }

  const [deletedUrl] = urls.splice(index, 1);
  await writeUrls(urls);

  return res.status(200).json({ message: "URL deleted", url: deletedUrl });
});


router.post("/", async (req, res) => {
  const validationError = validateResource(req.body);

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const urls = await readUrls();

  const newUrl = {
    id: urls.reduce((max, url) => Math.max(max, url.id), 0) + 1,
    originalUrl: req.body.originalUrl,
        shortCode: (() => {
      let code = "";
      let exists = true;

      while (exists) {
        code = Math.random().toString(36).slice(2, 8);
        exists = urls.some((url) => url.shortCode === code);
      }

      return code;
    })(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  urls.push(newUrl);
  await writeUrls(urls);

  res.status(201).json({
    ...newUrl,
    shortUrl: `${req.protocol}://${req.get("host")}/${newUrl.shortCode}`,
  });
});

export default router;