import { Router } from "express";
import { latestPrices } from "../services/stockStream.js"
import { getAssets, updateAssetPrice } from "../db/assets.js"
import "../services/cryptoStream.js"

const router = Router()

router.get("/assets", async (req, res) => {
    try {
        const assets = await getAssets();
        res.json(assets)
    } catch (error) {
        console.error("Failed to retrieve assets:", error);
        res.status(500).json({ error: "Failed to retrieve assets" })
    }
})

router.get("/assets/live", (req, res) => {
    const prices = Array.from(latestPrices, ([symbol, price]) => ({
        symbol,
        last_price: price.price,
        last_price_at: price.timestamp
    }));

    res.json(prices);
})

router.get("/assets/live/:symbol", (req, res) => {
    const symbol = req.params.symbol.toUpperCase();
    const livePrice = latestPrices.get(symbol);

    if (!livePrice) {
        return res.status(404).json({ error: "Live price not available" });
    }

    res.json({
        symbol,
        last_price: livePrice.price,
        last_price_at: livePrice.timestamp
    });
});

// This is not scaable but fine for the Size of app we have.
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
