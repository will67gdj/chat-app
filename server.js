const express = require("express");
const path = require("path");
const WebSocket = require("ws");

const app = express();

// Serve static files
app.use(express.static("public"));

// Serve chat page manually
app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "chat.html"));
});

const PORT = process.env.PORT || 10000;

const server = app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});

// WebSocket server
const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
    ws.on("message", msg => {
        // Broadcast to everyone
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msg);
            }
        });
    });
});
