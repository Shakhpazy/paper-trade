import WebSocket from "ws";

const latestPrices = new Map();

const dev = true;
const ws = dev
    ? "wss://stream.data.alpaca.markets/v2/test"
    : "wss://stream.data.alpaca.markets/v2/iex";

const trades = dev
    ? ["FAKEPACA"]
    : ["AAPL", "TSLA", "NVDA"];

const socket = new WebSocket(
    ws
);

socket.on("open", () => {
    console.log("Connected to Alpaca!")

    socket.send(JSON.stringify({
        action: "auth",
        key: process.env.ALPACA_API_KEY,
        secret: process.env.ALPACA_SECRET_KEY
    }));
})


// When Alpaca sends data
socket.on("message", (message) => {
  const events = JSON.parse(message.toString());

  for (const event of events) {
    if (event.T === "t") {
        latestPrices.set(event.S, {
            price: event.p,
            timestamp: event.t
      });
    }

    // Subscribe after successful authentication
    if (event.T === "success" && event.msg === "authenticated") {
        socket.send(JSON.stringify({
        action: "subscribe",
        trades: trades
        }));
    }
  }
});

socket.on("error", (error) => {
  console.error("WebSocket error:", error.message);
});

socket.on("close", () => {
  console.log("Disconnected from Alpaca");
});

export { latestPrices }