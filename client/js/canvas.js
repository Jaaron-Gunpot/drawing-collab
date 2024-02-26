//objects that holds the canvas object to be detected when it changes
let oldCanvas;
let newCanvas;
let canvasWidth = 500;
let canvasHeight = 500;

function setup() {
    //since this uses pointer, it automatically updates to the newest canvas
    oldCanvas = createCanvas(canvasWidth, canvasHeight);

    //creates a deep clone of the canvas to compare to
    newCanvas = Object.assign({}, oldCanvas);
}

function draw() {
    background(220);
    fill('red');
    circle(mouseX, mouseY, 50);
}


//move all this to sockets.js when i figure out how to import and export from the client
const socket = io();
socket.on('connect', () => {
    console.log(socket.id);
});
//make a get request when we are told that the canvas has changed so the client can update the canvas
//since everthing is sent as images, that means no deleting and a lot of overhead(don't know how to solve that yet)
socket.on('new-canvas', (e) => {
    console.log(e);
    loadImage(e.imageData)
    fetch('/newCanvas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        (response) => {return response.json();}
    ).then(
        (data) => {
            console.log(`the new canvas:${data.data}`);
        }
    );
});
const canvasChanged = () => {
    socket.emit('canvas-changed', "canvas changed!");
};
setInterval(canvasChanged, 5000);


//make a get request when the mouse is seen and make a post request when the mouse is released and post the canvas
function mouseMoved() {
    if (mouseX < canvasWidth && mouseY < canvasHeight && mouseX > 0 && mouseY > 0) {
        console.log('mouse moved on canvas');
        saveFrames('frame', 'png', 1, 1, data => {
            // Prints an array of objects containing raw image data,
            // filenames, and extensions.
            print(data[0]);
            fetch('/canvas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: data[0]
                })
            })
        });
    }
}