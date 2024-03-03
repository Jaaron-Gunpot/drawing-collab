const socketio = require('socket.io');

// put the io boject in the global scope
let io;

//
const rooms = [];

// tells connected sockets that the canvas has changed so they can update accordingly
// at this point I realized sockets are just an implementation of the observer pattern
const canvasChanged = (canvas, room) => {
  io.to(room).emit('new-canvas', canvas);
};

// I got this from a demo but I am not sure I need it yet
const handleRoomChange = (socket, roomName) => {
  socket.rooms.forEach((room) => {
    if (room === socket.id) return;
    socket.leave(room);
  });
  socket.join(roomName);
};

// setup the io object using a passed in server from server.js
const setupSockets = (server) => {
  io = socketio(server);
  // why is there a line character limit?
  // I want to export socket so i can emit events from other files but this is the entry file-fixed
  io.on('connection', (socket) => {
    socket.join('writing-room');

    //console.log(`connected socket:${socket.id}`);
    // should the server do something if the canvas hanges soket related?
    // the client already sends a post request when that happens so probably not
    socket.on('canvas-changed', () => {
      canvasChanged();
    });
    socket.on('room change', (room) => handleRoomChange(socket, room));
  });
  return io;
};

module.exports = {
  setupSockets,
  canvasChanged,
  rooms,
};
