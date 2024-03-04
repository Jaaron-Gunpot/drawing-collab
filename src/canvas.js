const socket = require('./sockets.js').canvasChanged;
// empry object to hold the most current canvas object
const currentCanvas = {};

/*
  {
    roomName:{
        data:{

        }
    }
  }
*/

// function to update and emit the current canvas object
// I don't know how to parse the image data into something usable
const updateCanvas = (request, response, body) => {
  // im not sure how to deal with the satus code so i put 204-fixed
  // most of the time its editing the canvas anyway
  // have to find some way to verify that the data is an updated canvas-fixed
  // from https://medium.com/@onlinemsr/javascript-object-empty-9f811ce54587#:~:text=3.-,Using%20Object.,a%20given%20object's%20property%20values.
  // if the canvas has not been touched yet, give 201, else give 204
  if (Object.keys(currentCanvas).length === 0) {
    response.writeHead(201, { 'Content-Type': 'application/json' });
  } else {
    response.writeHead(204, { 'Content-Type': 'application/json' });
  }
  // since javascript lets you make up object keys, this should work, but probably not good practice
  currentCanvas[body.roomName] = body.data;
  // console.log(body.roomName);
  socket(currentCanvas[body.roomName], body.roomName);
  // console.log(`updateCanvas:${JSON.stringify(body)}`);
  response.write(JSON.stringify({ message: 'updated canvas' }));
  response.end();
  // console.log(body);
};

// function to provide the current canvas for the room
const provideCanvas = (request, response, params) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  // check if the canvas exists or not
  if (Object.keys(currentCanvas).length === 0) {
    response.write(JSON.stringify({ message: 'no canvas' }));
    return response.end();
  }
  response.write(JSON.stringify(currentCanvas[params.room]));
  return response.end();
};

const provideCanvasMeta = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end();
};

module.exports = {
  updateCanvas,
  provideCanvas,
  provideCanvasMeta,
};
