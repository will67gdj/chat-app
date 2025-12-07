const ws = new WebSocket(`wss://${location.host}`);

const messages = document.getElementById("messages");
const input = document.getElementById("input");
const username = document.getElementById("username");
const send = document.getElementById("send");

function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

let myColor = randomColor();

// ✅ Make button clickable even if DOM loads weird
send.addEventListener("click", () => {
    if (!username.value.trim() || !input.value.trim()) {
        return;
    }

    const payload = {
        name: username.value,
        text: input.value,
        color: myColor
    };

    ws.send(JSON.stringify(payload));

    input.value = "";
});

// ✅ Also enable Enter key to send messages
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        send.click();
    }
});

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    const div = document.createElement("div");
    div.className = "message";
    div.style.color = data.color;

    div.innerHTML = `<strong>${data.name}:</strong> ${data.text}`;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;
};
