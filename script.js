const socket = new WebSocket("wss://omega-2-misy.onrender.com");

const connectBtn = document.getElementById("connect");
const nextBtn = document.getElementById("next");
const disconnectBtn = document.getElementById("disconnect");
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

let connected = false;

// Cuando se conecta al servidor
socket.onopen = () => {
    console.log("Conectado al servidor.");
};

// Cuando llega un mensaje
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "status") {
        messages.innerHTML = data.message;
    }

    if (data.type === "msg") {
        messages.innerHTML += `<br><b>Stranger:</b> ${data.message}`;
    }
};

// Enviar mensaje
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!connected) return;

    const msg = input.value.trim();
    if (msg === "") return;

    socket.send(JSON.stringify({ type: "msg", message: msg }));
    messages.innerHTML += `<br><b>You:</b> ${msg}`;
    input.value = "";
});

// Botón Conectar
connectBtn.onclick = () => {
    socket.send(JSON.stringify({ type: "connect" }));
    connected = true;
};

// Botón Siguiente
nextBtn.onclick = () => {
    socket.send(JSON.stringify({ type: "next" }));
    messages.innerHTML = "Buscando nuevo usuario...";
};

// Botón Salir
disconnectBtn.onclick = () => {
    socket.send(JSON.stringify({ type: "disconnect" }));
    messages.innerHTML = "Desconectado.";
    connected = false;
};
