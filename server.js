const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3001 });

console.log("✅ WebSocket server running on ws://localhost:3001");

wss.on("connection", (ws) => {
    console.log("✅ Client connected to WebSocket");

    ws.on("message", (message) => {
        console.log("📩 Received:", message.toString());  // Properly print received data

        // Send data to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
                console.log("📤 Sent data to frontend");
            }
        });
    });

    ws.on("close", () => {
        console.log("❌ Client disconnected");
    });
});
