import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());
  app.use(helmet({
    contentSecurityPolicy: false, // Disable for development convenience with Vite
  }));

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "SponAi" });
  });

  // DNA Analysis Endpoint (Placeholder for scoring logic)
  app.post("/api/scoring", async (req, res) => {
    const { eventDNA, sponsorStrategy } = req.body;
    // scoring logic will be implemented here
    res.json({ score: 0.85, match: "Strong" });
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SponAi server running on http://localhost:${PORT}`);
  });
}

startServer();
