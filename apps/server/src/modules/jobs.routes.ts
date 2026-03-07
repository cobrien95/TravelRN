/**
 * Jobs REST API Routes
 *
 * GET /api/v1/jobs         — List all active jobs
 * GET /api/v1/jobs/search  — Search/filter jobs
 * GET /api/v1/jobs/:id     — Get a single job by external ID
 */

import { Router } from "express";
import {
    fetchJobRequisitions,
    fetchJobById,
    searchJobs,
} from "../services/jobs.service.js";
import type { ShiftType } from "@prisma/client";

const router = Router();

/**
 * GET /api/v1/jobs
 * Returns all active job requisitions.
 */
router.get("/", async (_req, res) => {
    try {
        const jobs = await fetchJobRequisitions();
        res.json({ jobs, count: jobs.length });
    } catch (error) {
        console.error("[Jobs] Error fetching jobs:", error);
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
});

/**
 * GET /api/v1/jobs/search
 * Query params: specialty, state, shiftType, minWeeklyPay
 */
router.get("/search", async (req, res) => {
    try {
        const { specialty, state, shiftType, minWeeklyPay } = req.query;

        const jobs = await searchJobs({
            specialty: specialty as string | undefined,
            state: state as string | undefined,
            shiftType: shiftType as ShiftType | undefined,
            minWeeklyPay: minWeeklyPay ? Number(minWeeklyPay) : undefined,
        });

        res.json({ jobs, count: jobs.length });
    } catch (error) {
        console.error("[Jobs] Error searching jobs:", error);
        res.status(500).json({ error: "Failed to search jobs" });
    }
});

/**
 * GET /api/v1/jobs/:id
 * Returns a single job by its external ID.
 */
router.get("/:id", async (req, res) => {
    try {
        const job = await fetchJobById(req.params.id);
        if (!job) {
            res.status(404).json({ error: "Job not found" });
            return;
        }
        res.json({ job });
    } catch (error) {
        console.error("[Jobs] Error fetching job:", error);
        res.status(500).json({ error: "Failed to fetch job" });
    }
});

export default router;
