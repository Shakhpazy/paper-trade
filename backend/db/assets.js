import sql from "../config/database.js";


async function getAssets() {
    const assets = await sql`
    SELECT * 
    FROM assets
    `
    return assets
}

async function updateAssetPrice(symbol, price, timestamp) {
    const result = await sql`
        UPDATE assets
        SET
            last_price = ${price},
            last_price_at = ${timestamp}
        WHERE symbol = ${symbol}
          AND (last_price_at IS NULL OR last_price_at < ${timestamp})
        RETURNING *
    `;

    return result[0] ?? null;
}

export { getAssets, updateAssetPrice }