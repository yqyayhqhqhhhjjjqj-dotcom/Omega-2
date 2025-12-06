const socket = io("https://TU-RENDER.onrender.com");
let peer;
let otherID;

async function find() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    document.getElementById("localVideo").srcObject = stream;

    peer = new SimplePeer({ initiator: true, trickle: false, stream });

    peer.on("signal", signal => {
        socket.emit("signal", { to: otherID, signal });
    });

    peer.on("stream", stream => {
        document.getElementById("remoteVideo").srcObject = stream;
    });
}

socket.on("match", id => {
    otherID = id;
});

socket.on("signal", data => {
    peer.signal(data.signal);
});
