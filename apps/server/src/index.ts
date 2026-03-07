/**
 * TravelRN — Express Server Entry Point
 */

import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { prisma } from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 4000;

// ─── Global Middleware ───────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express.json({ limit: "10mb" }));

// ─── Health Check ────────────────────────────────
app.get("/health", async (_req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({
            status: "healthy",
            service: "travelrn-api",
            timestamp: new Date().toISOString(),
            database: "connected",
        });
    } catch {
        res.status(503).json({
            status: "unhealthy",
            service: "travelrn-api",
            timestamp: new Date().toISOString(),
            database: "disconnected",
        });
    }
});

// ─── Routes ──────────────────────────────────────
import agentRoutes from "./modules/agent.routes.js";
import jobsRoutes from "./modules/jobs.routes.js";

app.use("/api/v1/agent", agentRoutes);
app.use("/api/v1/jobs", jobsRoutes);

app.get("/api/v1", (_req, res) => {
    res.json({
        message: "TravelRN API v1",
        version: "0.1.0",
        endpoints: {
            health: "/health",
            agent: "/api/v1/agent/chat (POST)",
            jobs: "/api/v1/jobs (GET)",
            jobsSearch: "/api/v1/jobs/search (GET)",
            jobById: "/api/v1/jobs/:id (GET)",
            nurses: "/api/v1/nurses (coming soon)",
            housing: "/api/v1/housing (coming soon)",
        },
    });
});

// ─── Start Server ────────────────────────────────
app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`\n🩺 TravelRN API running on port ${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/health`);
    console.log(`   Docs:   http://localhost:${PORT}/api/v1\n`);
});

export default app;
