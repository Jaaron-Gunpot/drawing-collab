//move all this to sockets.js when i figure out how to import and export from the client
const socket = io();
socket.on('connect', () => {
    socket.emit('room change', roomName);
    console.log(socket.id);
});
//make a get request when we are told that the canvas has changed so the client can update the canvas
//since everthing is sent as images, that means no deleting and a lot of overhead(don't know how to solve that yet)
socket.on('new-canvas', (e) => {
    //i can make the background using just the e since it is the same thing but im making another request just because
    //console.log(e);
    fetch(`/newCanvas?room=${roomName}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(
        (response) => {return response.json();}
    ).then(
        (data) => {
            loadImage(data.imageData, img => {
                newCanvas = img;
            });
        }
    );
});