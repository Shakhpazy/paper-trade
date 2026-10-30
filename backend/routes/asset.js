import { Router } from "express";
import { latestPrices } from "../services/stockStream.js"

const router = Router()

router.get("/assets/live", async (req, res) => {
    try {
        res.json(Object.fromEntries(latestPrices))
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve prices" })
    }
})

export default router