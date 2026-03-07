/**
 * Agent API Routes
 *
 * POST /api/v1/agent/chat — Send a message to the TravelRN Copilot
 */

import { Router } from "express";
import { runAgentQuery } from "../agents/supervisor.js";

const router = Router();

/**
 * POST /api/v1/agent/chat
 * Body: { message: string }
 * Returns: { response: string }
 */
router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== "string") {
            res.status(400).json({
                error: "Bad Request",
                message: 'Request body must include a "message" string.',
            });
            return;
        }

        console.log(`[Agent] Incoming query: "${message.substring(0, 100)}..."`);

        const response = await runAgentQuery(message);

        // Try to parse JSON from the response if it contains a code block
        let parsedResult = null;
        const jsonMatch = response.match(/```json\s*([\s\S]*?)```/);
        if (jsonMatch) {
            try {
                parsedResult = JSON.parse(jsonMatch[1]);
            } catch {
                // Not valid JSON, that's fine
            }
        }

        res.json({
            response,
            structured: parsedResult,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("[Agent] Error:", error);
        res.status(500).json({
            error: "Agent Error",
            message:
                "The AI assistant encountered an error processing your request. Please try again.",
        });
    }
});

export default router;
