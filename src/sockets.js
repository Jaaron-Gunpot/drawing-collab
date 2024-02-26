const { io } = require('./server.js');

//dummy function to be assigned in socket so it can be exported
let canvasChanged;

io.on('connection', (socket) => {
  console.log(`connected socket:${socket.id}`);
  socket.on('canvas-changed',(e)=>{
    console.log(e);
  });
  canvasChanged = (e) => {
    socket.emit('canvas-changed', e);
  };
});

module.exports = {
  canvasChanged,
};
