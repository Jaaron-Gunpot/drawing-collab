const socketio = require('socket.io');

//dummy function to be assigned in socket so it can be exported
let canvasChanged;

//put the io boject in the global scope
let io;

//setup the io object using a passed in server from server.js
const setupSockets = (server) => {
  io = socketio(server);
  return io;
};

//I want to export socket so i can emit events from other files but this is the entry file
io.on('connection', (socket) => {
  console.log(`connected socket:${socket.id}`);
  socket.on('canvas-changed',(e)=>{
    console.log(e);
  });
  //tells connected sockets that the canvas has changed so they can update accordingly
  //at this point I realized sockets are just an implementation of the observer pattern
  canvasChanged = (e) => {
    socket.emit('canvas-changed', e);
  };
});

module.exports = {
  setupSockets,
  canvasChanged
};
