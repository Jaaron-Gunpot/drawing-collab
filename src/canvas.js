const socket = require('./sockets.js').canvasChanged;
//empry object to hold the most current canvas object
let currentCanvas = {};


//function to update and emit the current canvas object
//I don't know how to parse the image data into something usable
const updateCanvas = (request, response, body) => {
    response.writeHead(204, { 'Content-Type': 'application/json' });
    currentCanvas = body.data;
    socket(currentCanvas);
    response.write(JSON.stringify(currentCanvas));
    response.end();
    console.log(body);
};

module.exports = { 
    updateCanvas
};