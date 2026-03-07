import { Router } from "express";
import { fetchCredentials, fetchCredentialById } from "../services/credentials.service.js";

const router = Router();

router.get("/", async (_req, res) => {
    const credentials = await fetchCredentials();
    res.json(credentials);
});

router.get("/:id", async (req, res) => {
    const credential = await fetchCredentialById(req.params.id);
    if (!credential) return res.status(404).json({ error: "Credential not found" });
    res.json(credential);
});

export default router;
