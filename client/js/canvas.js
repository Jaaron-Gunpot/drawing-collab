//objects that holds the canvas object to be detected when it changes
let oldCanvas;
let newCanvas;

function setup() {
    //since this uses pointer, it automatically updates to the newest canvas
    oldCanvas = createCanvas(400, 400);

    //creates a deep clone of the canvas to compare to
    newCanvas = Object.assign({},oldCanvas);
}

function draw() {
    background(220);
    fill('red');
    circle(mouseX, mouseY, 50);
}

const socket = io();
socket.on('connect', () => {
    console.log(socket.id);
});
const canvasChanged = () =>{
    socket.emit('canvas-changed', "canvas changed!");
};
setInterval(canvasChanged,5000);