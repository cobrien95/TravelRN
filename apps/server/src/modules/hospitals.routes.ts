import { Router } from "express";
import { fetchHospitals, fetchHospitalById, searchHospitals } from "../services/hospitals.service.js";

const router = Router();

router.get("/", async (_req, res) => {
    const city = _req.query.city as string | undefined;
    const hospitals = city ? await searchHospitals(city) : await fetchHospitals();
    res.json(hospitals);
});

router.get("/:id", async (req, res) => {
    const hospital = await fetchHospitalById(req.params.id);
    if (!hospital) return res.status(404).json({ error: "Hospital not found" });
    res.json(hospital);
});

export default router;
