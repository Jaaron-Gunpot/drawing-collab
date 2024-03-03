//objects that holds the canvas object to be detected when it changes
let serverCanvas;
let oldCanvas;
let newCanvas;
let canvasWidth = 500;
let canvasHeight = 500;
let drawing = false;
const roomName = localStorage.getItem('room');

function preload(){
    //send them back to the room page if they are not in a room
    if(roomName === null){window.location.href='/';}
    fetch('/newCanvas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        (response) => {return response.json();}
    ).then(
        (data) => {
            loadImage(data.imageData, img => {
                serverCanvas = img;
            });
        }
    );

}

function setup() {
    //since this uses pointer, it automatically updates to the newest canvas
    oldCanvas = createCanvas(canvasWidth, canvasHeight);
}
//a function so i can control when the background is drawn
const drawBackground = () => {
    background(220);
};

function draw() {
    if(serverCanvas){image(serverCanvas, 0, 0);}else{drawBackground();}
    fill('red');
    if(newCanvas){image(newCanvas, 0, 0);}
    if(drawing){
        circle(mouseX, mouseY, 20);
    }
}

//move all this to sockets.js when i figure out how to import and export from the client
const socket = io();
socket.on('connect', () => {
    socket.emit('room change', );
    console.log(socket.id);
});
//make a get request when we are told that the canvas has changed so the client can update the canvas
//since everthing is sent as images, that means no deleting and a lot of overhead(don't know how to solve that yet)
socket.on('new-canvas', (e) => {
    //i can make the background using just the e since it is the same thing but im making another request just because
    //console.log(e);
    fetch(`/newCanvas?${roomName}`, {
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
//setInterval(canvasChanged, 5000);


//make a get request when the mouse is seen and make a post request when the mouse is released and post the canvas
function mouseMoved() {
    if (mouseX < canvasWidth && mouseY < canvasHeight && mouseX > 0 && mouseY > 0) {
        console.log('mouse moved on canvas');
        saveFrames('frame', 'png', 1, 1, data => {
            // Prints an array of objects containing raw image data,
            // filenames, and extensions.
            print(data[0]);
            //since each client has their own instance of canvas that gets posted to the server,
            //a new client can reset the canvas when they connect
            //will probably need to authenticate if the canvas is legit in the server-fixed
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
//change the state of the drawing boolean so the user can control when to draw
function mouseClicked(){
    if(drawing){
        drawing=false;
    }else{
        drawing=true;
    }
}



//find some way to make the user control when they are drawing instead of drawing the mouse
