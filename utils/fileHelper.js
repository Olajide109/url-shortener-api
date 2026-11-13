import fs from "fs/promises";

import path from "path";

import { fileURLToPath } from "url";

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const filePath = path.join(currentDir, "../data/urls.json");

export async function readUrls() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function writeUrls(urls) {
  await fs.writeFile(filePath, JSON.stringify(urls, null, 2));
}