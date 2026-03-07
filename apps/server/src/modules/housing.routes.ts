import { Router } from "express";
import { fetchHousing, fetchHousingById, searchHousing } from "../services/housing.service.js";

const router = Router();

router.get("/", async (req, res) => {
    const { city, maxRent, petFriendly } = req.query;
    const housing = await searchHousing({
        city: city as string | undefined,
        maxRent: maxRent ? Number(maxRent) : undefined,
        petFriendly: petFriendly === "true",
    });
    res.json(housing);
});

router.get("/:id", async (req, res) => {
    const unit = await fetchHousingById(req.params.id);
    if (!unit) return res.status(404).json({ error: "Housing not found" });
    res.json(unit);
});

export default router;
