import express from "express";
import urlsRoutes from "./routes/urls.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/resources", urlsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});