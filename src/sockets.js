const io = require('./server.js').io;

io.on('connection', (socket)=>{
    console.log(`connected socket:${socket}`);
});