// Streams live BTC and ETH prices from Binance into latestPrices
import WebSocket from "ws";
import { latestPrices } from "./stockStream.js";

// Binance.com blocks US IPs, so use Binance.US (switch if you get connection errors)
const BASE = "wss://stream.binance.us:9443";
// const BASE = "wss://stream.binance.com:9443";

// Maps Binance symbols to the symbols in the assets table
const SYMBOL_MAP = {
    BTCUSDT: "BTC",
    ETHUSDT: "ETH",
};

function connect() {
    const streams = Object.keys(SYMBOL_MAP)
        .map((s) => `${s.toLowerCase()}@ticker`)
        .join("/");

    const socket = new WebSocket(`${BASE}/stream?streams=${streams}`);

    socket.on("open", () => {
        console.log("Connected to Binance");
    });

    socket.on("message", (message) => {
        // data.s = symbol, data.c = last price, data.E = event time (ms)
        const { data } = JSON.parse(message.toString());
        const symbol = SYMBOL_MAP[data.s];
        if (!symbol) return;

        // Same shape as stockStream.js so asset.js can read it from latestPrices
        latestPrices.set(symbol, {
            price: parseFloat(data.c),
            timestamp: new Date(data.E).toISOString(),
        });
    });

    socket.on("error", (error) => {
        console.error("Binance WebSocket error:", error.message);
    });

    // Reconnect automatically if the connection drops
    socket.on("close", () => {
        console.log("Disconnected from Binance, retrying in 3s");
        setTimeout(connect, 3000);
    });
}

connect();