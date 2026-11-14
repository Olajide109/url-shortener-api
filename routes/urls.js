import express from "express";
import { readUrls } from "../utils/fileHelper.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const urls = await readUrls();
  res.status(200).json(urls);
});

export default router;