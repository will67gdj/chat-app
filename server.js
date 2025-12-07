const express = require("express");
const path = require("path");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const port = process.env.PORT || 10000;

// Serve the public folder
app.use(express.static(path.join(__dirname, "public")));

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("A user connected");

    ws.on("message", (message) => {
        console.log("Received:", message.toString());

        // Broadcast message to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on("close", () => {
        console.log("A user disconnected");
    });
});

// Start server
server.listen(port, () => {
    console.log("Chat server running on port", port);
});
