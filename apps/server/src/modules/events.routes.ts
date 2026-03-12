import { Request, Response, Router } from "express";
import { getLocalEvents } from "../services/events.service.js";

const router = Router();

/**
 * @route GET /api/v1/events
 * @desc Get local social events based on a location (city/state or zip)
 * @access Public
 */
router.get("/", async (req: Request, res: Response) => {
    try {
        const { location } = req.query;
        // Default to Denver if no location is provided
        const city = typeof location === "string" ? location : "Denver";

        const events = await getLocalEvents(city);

        res.json({
            status: "success",
            data: events,
        });
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to fetch local events",
        });
    }
});

export default router;
