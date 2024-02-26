//objects that holds the canvas object to be detected when it changes
let serverCanvas;
let oldCanvas;
let newCanvas;
let canvasWidth = 500;
let canvasHeight = 500;

const getNewCanvas = (canvasObject) => {
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
                canvasObject = img;
            });
        }
    );
};

function preload(){
    //if this is a new client, grab the most recent canvas from the server
    getNewCanvas(serverCanvas);
}

function setup() {
    //since this uses pointer, it automatically updates to the newest canvas
    oldCanvas = createCanvas(canvasWidth, canvasHeight);
    //get the saved canvas from the server on startup
    //can you make fetch requests a function?
    //I'm using the same request a lot but i don't know how fetch works in a function
    // fetch('/newCanvas', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(
    //     (response) => {return response.json();}
    // ).then(
    //     (data) => {
    //         console.log(`startup retrieved canvas: ${data}`);
    //         loadImage(data.imageData, img => {
    //             newCanvas = img;
    //         });
    //     }
    // );
    // image(newCanvas, 0, 0);
}

function draw() {
    if(serverCanvas){
        image(serverCanvas, 0, 0);
    }else{
        background(220);
    }
    fill('red');
    if(newCanvas){image(newCanvas, 0, 0);}
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
    //i can make the background using just the e since it is the same thing but im making another request just because
    console.log(e);
    getNewCanvas(newCanvas);
});
//testing web sockets
const canvasChanged = () => {
    socket.emit('canvas-changed', "canvas changed!");
};
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
            //will probably need to authenticate if the canvas is legit in the server
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



//find some way to make the user control when they are drawing instead of drawing the mouse
