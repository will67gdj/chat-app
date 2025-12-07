const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();

// ✅ Serve static files (your chat page)
app.use(express.static(path.join(__dirname, "public")));

// ✅ HTTP server
const server = http.createServer(app);

// ✅ WebSocket server
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (msg) => {
        console.log("Message:", msg.toString());

        // Broadcast to everyone
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(msg);
            }
        });
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

const PORT = process.env.PORT || 10000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
