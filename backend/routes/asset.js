import { Router } from "express";
import { latestPrices } from "../services/stockStream.js"
import { getAssets, updateAssetPrice } from "../db/assets.js"

const router = Router()

router.get("/assets/live", async (req, res) => {
    try {
        const result = await getAssets();

        for (const asset of result) {
            const livePrice = latestPrices.get(asset.symbol);

            if (livePrice) {
                asset.last_price = livePrice.price;
                asset.last_price_at = livePrice.timestamp;
            }
        }

        console.log(latestPrices)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve prices" })
    }
})

async function saveLatestPrices() {
    for (const [symbol, data] of latestPrices) {
        try {
            await updateAssetPrice(symbol, data.price, data.timestamp);
        } catch (error) {
            console.error(`Failed to update ${symbol}:`, error);
        }
    }
}

//updates the stock data in the db every minute as a fallback to not display no price.
setInterval(saveLatestPrices, 60000);

export default router