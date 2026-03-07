import { Router } from "express";
import { calculateTaxEstimate } from "../services/tax.service.js";

const router = Router();

router.post("/calculate", async (req, res) => {
    const { state, hourlyRate, hoursPerWeek, contractWeeks } = req.body;

    if (!state || !hourlyRate || !hoursPerWeek || !contractWeeks) {
        return res.status(400).json({
            error: "Missing required fields: state, hourlyRate, hoursPerWeek, contractWeeks",
        });
    }

    const result = await calculateTaxEstimate({
        state,
        hourlyRate: Number(hourlyRate),
        hoursPerWeek: Number(hoursPerWeek),
        contractWeeks: Number(contractWeeks),
    });

    res.json(result);
});

export default router;
