const { io } = require('./server.js');

io.on('connection', (socket) => {
  console.log(`connected socket:${socket.id}`);
  socket.on('canvas-changed',(e)=>{
    console.log(e);
  });
});
