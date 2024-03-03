const { rooms } = require('./sockets.js');

// If there is a room that already exists, give it to them
// If there is no room, create one
const createRoom = (request, response, body) => {
  const roomName = body.room;
  // if they did'nt give a room name
  if (roomName === undefined) {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ message: 'room name required' }));
    response.end();
  } else if (rooms.includes(roomName)) {
    // if the room name already exists
    // (shouldn't happen but just to be safe)
    // I don't know what status code to use
    response.writeHead(409, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ message: 'room already exists' }));
    response.end();
  } else { // Create the room
    rooms.push(roomName);
    response.writeHead(201, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ message: 'room created' }));
    response.end();
  }
};

//confirms to client if the rquested room exists
const roomRequest = (request, response, params) => {
  const foundRoom = rooms.find((room) => room === params.room);
  console.log(foundRoom);
  // if the room doesn't exist, give them an error message
  if (!foundRoom) {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ message: 'room not found' }));
    response.end();
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ message: 'room found' }));
    response.end();
  }
};

const roomRequestMeta = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end();
};

module.exports = {
  createRoom,
  roomRequest,
  roomRequestMeta,
};
